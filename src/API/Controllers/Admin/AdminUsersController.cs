using Application.DTOs;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers.Admin;

[ApiController]
[Route("api/admin/[controller]")]
[Authorize(Roles = "Admin")]
public class AdminUsersController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly RoleManager<Role> _roleManager;

    public AdminUsersController(UserManager<User> userManager, RoleManager<Role> roleManager)
    {
        _userManager = userManager;
        _roleManager = roleManager;
    }

    /// <summary>
    /// Admin: Get all users
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(PagedResult<UserDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<PagedResult<UserDto>>> GetAll(
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20,
        [FromQuery] string? searchTerm = null,
        [FromQuery] bool? isActive = null)
    {
        var query = _userManager.Users.AsQueryable();

        if (!string.IsNullOrWhiteSpace(searchTerm))
        {
            query = query.Where(u =>
                u.Email.Contains(searchTerm) ||
                u.FirstName.Contains(searchTerm) ||
                u.LastName.Contains(searchTerm));
        }

        if (isActive.HasValue)
        {
            query = query.Where(u => u.IsActive == isActive.Value);
        }

        var totalCount = await query.CountAsync();
        var users = await query
            .OrderByDescending(u => u.CreatedAt)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        var userDtos = new List<UserDto>();
        foreach (var user in users)
        {
            var roles = await _userManager.GetRolesAsync(user);
            userDtos.Add(new UserDto
            {
                Id = user.Id,
                Email = user.Email!,
                FirstName = user.FirstName,
                LastName = user.LastName,
                PhoneNumber = user.PhoneNumber,
                IsActive = user.IsActive,
                EmailConfirmed = user.EmailConfirmed,
                CreatedAt = user.CreatedAt,
                Roles = roles.ToList()
            });
        }

        var result = new PagedResult<UserDto>
        {
            Items = userDtos,
            TotalCount = totalCount,
            PageNumber = pageNumber,
            PageSize = pageSize,
            TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize)
        };

        return Ok(result);
    }

    /// <summary>
    /// Admin: Get user by ID
    /// </summary>
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(UserDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<UserDto>> GetById(Guid id)
    {
        var user = await _userManager.FindByIdAsync(id.ToString());
        if (user == null)
        {
            return NotFound();
        }

        var roles = await _userManager.GetRolesAsync(user);

        var userDto = new UserDto
        {
            Id = user.Id,
            Email = user.Email!,
            FirstName = user.FirstName,
            LastName = user.LastName,
            PhoneNumber = user.PhoneNumber,
            IsActive = user.IsActive,
            EmailConfirmed = user.EmailConfirmed,
            CreatedAt = user.CreatedAt,
            Roles = roles.ToList()
        };

        return Ok(userDto);
    }

    /// <summary>
    /// Admin: Toggle user active status
    /// </summary>
    [HttpPatch("{id}/toggle-active")]
    [ProducesResponseType(typeof(UserDto), StatusCodes.Status200OK)]
    public async Task<ActionResult<UserDto>> ToggleActive(Guid id)
    {
        var user = await _userManager.FindByIdAsync(id.ToString());
        if (user == null)
        {
            return NotFound();
        }

        user.IsActive = !user.IsActive;
        await _userManager.UpdateAsync(user);

        var roles = await _userManager.GetRolesAsync(user);

        return Ok(new UserDto
        {
            Id = user.Id,
            Email = user.Email!,
            FirstName = user.FirstName,
            LastName = user.LastName,
            IsActive = user.IsActive,
            EmailConfirmed = user.EmailConfirmed,
            CreatedAt = user.CreatedAt,
            Roles = roles.ToList()
        });
    }

    /// <summary>
    /// Admin: Add role to user
    /// </summary>
    [HttpPost("{id}/roles/{roleName}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> AddRole(Guid id, string roleName)
    {
        var user = await _userManager.FindByIdAsync(id.ToString());
        if (user == null)
        {
            return NotFound("User not found");
        }

        if (!await _roleManager.RoleExistsAsync(roleName))
        {
            return NotFound("Role not found");
        }

        var result = await _userManager.AddToRoleAsync(user, roleName);
        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        return Ok(new { message = $"Role '{roleName}' added to user" });
    }

    /// <summary>
    /// Admin: Remove role from user
    /// </summary>
    [HttpDelete("{id}/roles/{roleName}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> RemoveRole(Guid id, string roleName)
    {
        var user = await _userManager.FindByIdAsync(id.ToString());
        if (user == null)
        {
            return NotFound("User not found");
        }

        var result = await _userManager.RemoveFromRoleAsync(user, roleName);
        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        return Ok(new { message = $"Role '{roleName}' removed from user" });
    }

    /// <summary>
    /// Admin: Get all roles
    /// </summary>
    [HttpGet("~/api/admin/roles")]
    [ProducesResponseType(typeof(List<RoleDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<List<RoleDto>>> GetRoles()
    {
        var roles = await _roleManager.Roles
            .Select(r => new RoleDto
            {
                Id = r.Id,
                Name = r.Name!,
                Description = r.Description
            })
            .ToListAsync();

        return Ok(roles);
    }

    /// <summary>
    /// Admin: Get user statistics
    /// </summary>
    [HttpGet("statistics")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    public async Task<ActionResult> GetStatistics()
    {
        var totalUsers = await _userManager.Users.CountAsync();
        var activeUsers = await _userManager.Users.CountAsync(u => u.IsActive);
        var verifiedEmails = await _userManager.Users.CountAsync(u => u.EmailConfirmed);
        var usersLast30Days = await _userManager.Users.CountAsync(u => u.CreatedAt >= DateTime.UtcNow.AddDays(-30));

        var stats = new
        {
            TotalUsers = totalUsers,
            ActiveUsers = activeUsers,
            InactiveUsers = totalUsers - activeUsers,
            VerifiedEmails = verifiedEmails,
            UnverifiedEmails = totalUsers - verifiedEmails,
            NewUsersLast30Days = usersLast30Days
        };

        return Ok(stats);
    }
}

public class UserDto
{
    public Guid Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string? PhoneNumber { get; set; }
    public bool IsActive { get; set; }
    public bool EmailConfirmed { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<string> Roles { get; set; } = new();
}

public class RoleDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
}
