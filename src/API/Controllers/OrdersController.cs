using Application.Commands.Orders;
using Application.Queries.Orders;
using Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class OrdersController : ControllerBase
{
    private readonly IMediator _mediator;

    public OrdersController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Create a new order
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<CreateOrderResponse>> CreateOrder([FromBody] CreateOrderCommand command)
    {
        // Set userId from authenticated user
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized();
        }

        command.UserId = Guid.Parse(userId);
        var response = await _mediator.Send(command);
        return Ok(response);
    }

    /// <summary>
    /// Get orders with filtering and pagination
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<Application.DTOs.PagedResult<OrderDto>>> GetOrders(
        [FromQuery] OrderStatus? status,
        [FromQuery] DateTime? startDate,
        [FromQuery] DateTime? endDate,
        [FromQuery] string? orderNumber,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized();
        }

        var query = new GetOrdersQuery
        {
            UserId = Guid.Parse(userId),
            Status = status,
            StartDate = startDate,
            EndDate = endDate,
            OrderNumber = orderNumber,
            PageNumber = pageNumber,
            PageSize = pageSize
        };

        var response = await _mediator.Send(query);
        return Ok(response);
    }

    /// <summary>
    /// Get all orders (admin only)
    /// </summary>
    [HttpGet("admin")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<Application.DTOs.PagedResult<OrderDto>>> GetAllOrders(
        [FromQuery] Guid? userId,
        [FromQuery] OrderStatus? status,
        [FromQuery] DateTime? startDate,
        [FromQuery] DateTime? endDate,
        [FromQuery] string? orderNumber,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10)
    {
        var query = new GetOrdersQuery
        {
            UserId = userId,
            Status = status,
            StartDate = startDate,
            EndDate = endDate,
            OrderNumber = orderNumber,
            PageNumber = pageNumber,
            PageSize = pageSize
        };

        var response = await _mediator.Send(query);
        return Ok(response);
    }

    /// <summary>
    /// Update order status (admin only)
    /// </summary>
    [HttpPut("{orderId}/status")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<UpdateOrderStatusResponse>> UpdateOrderStatus(
        Guid orderId,
        [FromBody] UpdateOrderStatusRequest request)
    {
        var command = new UpdateOrderStatusCommand
        {
            OrderId = orderId,
            NewStatus = request.Status,
            Notes = request.Notes
        };

        var response = await _mediator.Send(command);
        return Ok(response);
    }
}

public class UpdateOrderStatusRequest
{
    public OrderStatus Status { get; set; }
    public string? Notes { get; set; }
}
