using Domain.Entities;
using Domain.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Commands.Auth;

public class LoginCommandHandler : IRequestHandler<LoginCommand, LoginResponse>
{
    private readonly IRepository<User> _userRepository;
    private readonly IRepository<UserRole> _userRoleRepository;
    private readonly IRepository<Role> _roleRepository;
    private readonly IPasswordHasher<User> _passwordHasher;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    public LoginCommandHandler(
        IRepository<User> userRepository,
        IRepository<UserRole> userRoleRepository,
        IRepository<Role> roleRepository,
        IPasswordHasher<User> passwordHasher,
        IJwtTokenGenerator jwtTokenGenerator)
    {
        _userRepository = userRepository;
        _userRoleRepository = userRoleRepository;
        _roleRepository = roleRepository;
        _passwordHasher = passwordHasher;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<LoginResponse> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        // Find user by email
        var users = await _userRepository.GetAllAsync();
        var user = users.FirstOrDefault(u => u.Email.ToLower() == request.Email.ToLower());

        if (user == null)
        {
            throw new UnauthorizedAccessException("Email veya şifre hatalı.");
        }

        if (!user.IsActive)
        {
            throw new UnauthorizedAccessException("Hesabınız aktif değil.");
        }

        // Verify password
        var verificationResult = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.Password);
        if (verificationResult == PasswordVerificationResult.Failed)
        {
            throw new UnauthorizedAccessException("Email veya şifre hatalı.");
        }

        // Get user roles
        var userRoles = await _userRoleRepository.GetAllAsync();
        var userRoleIds = userRoles.Where(ur => ur.UserId == user.Id).Select(ur => ur.RoleId).ToList();
        
        var roles = await _roleRepository.GetAllAsync();
        var roleNames = roles.Where(r => userRoleIds.Contains(r.Id)).Select(r => r.Name).ToList();

        // Generate JWT token
        var token = _jwtTokenGenerator.GenerateToken(user, roleNames);

        // Update last login (will be saved with UnitOfWork if needed)
        await _userRepository.UpdateAsync(user);

        return new LoginResponse
        {
            UserId = user.Id,
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Token = token,
            Roles = roleNames
        };
    }
}
