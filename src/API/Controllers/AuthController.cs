using Application.Commands.Auth;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IMediator _mediator;

    public AuthController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Register a new user
    /// </summary>
    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<ActionResult<RegisterResponse>> Register([FromBody] RegisterCommand command)
    {
        var response = await _mediator.Send(command);
        return Ok(response);
    }

    /// <summary>
    /// Login with email and password
    /// </summary>
    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginCommand command)
    {
        var response = await _mediator.Send(command);
        return Ok(response);
    }

    /// <summary>
    /// Get current user info (requires authentication)
    /// </summary>
    [HttpGet("me")]
    [Authorize]
    public ActionResult<object> GetCurrentUser()
    {
        var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        var email = User.FindFirst(System.Security.Claims.ClaimTypes.Email)?.Value;
        var name = User.FindFirst(System.Security.Claims.ClaimTypes.Name)?.Value;
        var roles = User.FindAll(System.Security.Claims.ClaimTypes.Role).Select(c => c.Value).ToList();

        return Ok(new
        {
            userId,
            email,
            name,
            roles
        });
    }
}
