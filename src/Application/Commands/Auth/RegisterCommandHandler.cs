using Domain.Entities;
using Domain.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Commands.Auth;

public class RegisterCommandHandler : IRequestHandler<RegisterCommand, RegisterResponse>
{
    private readonly IRepository<User> _userRepository;
    private readonly IRepository<Role> _roleRepository;
    private readonly IRepository<UserRole> _userRoleRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IPasswordHasher<User> _passwordHasher;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    public RegisterCommandHandler(
        IRepository<User> userRepository,
        IRepository<Role> roleRepository,
        IRepository<UserRole> userRoleRepository,
        IUnitOfWork unitOfWork,
        IPasswordHasher<User> passwordHasher,
        IJwtTokenGenerator jwtTokenGenerator)
    {
        _userRepository = userRepository;
        _roleRepository = roleRepository;
        _userRoleRepository = userRoleRepository;
        _unitOfWork = unitOfWork;
        _passwordHasher = passwordHasher;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<RegisterResponse> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        // Check if user already exists
        var existingUsers = await _userRepository.GetAllAsync();
        if (existingUsers.Any(u => u.Email.ToLower() == request.Email.ToLower()))
        {
            throw new InvalidOperationException("Bu email adresi zaten kullanılıyor.");
        }

        // Create user
        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = request.Email,
            FirstName = request.FirstName,
            LastName = request.LastName,
            PhoneNumber = request.PhoneNumber,
            IsActive = true,
            EmailConfirmed = false,
            CreatedAt = DateTime.UtcNow
        };

        // Hash password
        user.PasswordHash = _passwordHasher.HashPassword(user, request.Password);

        await _userRepository.AddAsync(user);

        // Assign default "Customer" role
        var customerRole = (await _roleRepository.GetAllAsync())
            .FirstOrDefault(r => r.Name == "Customer");

        if (customerRole == null)
        {
            // Create Customer role if it doesn't exist
            customerRole = new Role
            {
                Id = Guid.NewGuid(),
                Name = "Customer",
                Description = "Default customer role",
                CreatedAt = DateTime.UtcNow
            };
            await _roleRepository.AddAsync(customerRole);
        }

        var userRole = new UserRole
        {
            UserId = user.Id,
            RoleId = customerRole.Id,
            CreatedAt = DateTime.UtcNow
        };

        await _userRoleRepository.AddAsync(userRole);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        // Generate JWT token
        var token = _jwtTokenGenerator.GenerateToken(user, new[] { customerRole.Name });

        return new RegisterResponse
        {
            UserId = user.Id,
            Email = user.Email,
            Token = token
        };
    }
}
