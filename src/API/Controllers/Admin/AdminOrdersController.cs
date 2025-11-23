using Application.Commands.Orders;
using Application.DTOs;
using Application.Queries.Orders;
using Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OrderDto = Application.Queries.Orders.OrderDto;

namespace API.Controllers.Admin;

[ApiController]
[Route("api/admin/[controller]")]
[Authorize(Roles = "Admin")]
public class AdminOrdersController : ControllerBase
{
    private readonly IMediator _mediator;

    public AdminOrdersController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Admin: Get all orders with filters
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(PagedResult<OrderDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<PagedResult<OrderDto>>> GetAll(
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20,
        [FromQuery] OrderStatus? status = null,
        [FromQuery] DateTime? startDate = null,
        [FromQuery] DateTime? endDate = null,
        [FromQuery] string? orderNumber = null)
    {
        var query = new GetOrdersQuery
        {
            PageNumber = pageNumber,
            PageSize = pageSize,
            Status = status,
            StartDate = startDate,
            EndDate = endDate,
            OrderNumber = orderNumber
        };

        var result = await _mediator.Send(query);
        return Ok(result);
    }

    /// <summary>
    /// Admin: Get order by ID
    /// </summary>
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(OrderDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<OrderDto>> GetById(Guid id)
    {
        var query = new GetOrdersQuery { PageNumber = 1, PageSize = 1 };
        var result = await _mediator.Send(query);
        var order = result.Items.FirstOrDefault(o => o.Id == id);
        
        if (order == null)
        {
            return NotFound();
        }
        
        return Ok(order);
    }

    /// <summary>
    /// Admin: Update order status
    /// </summary>
    [HttpPatch("{id}/status")]
    [ProducesResponseType(typeof(UpdateOrderStatusResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<UpdateOrderStatusResponse>> UpdateStatus(
        Guid id,
        [FromBody] UpdateOrderStatusCommand command)
    {
        if (id != command.OrderId)
        {
            return BadRequest("ID mismatch");
        }

        var result = await _mediator.Send(command);
        return Ok(result);
    }

    /// <summary>
    /// Admin: Cancel order
    /// </summary>
    [HttpPost("{id}/cancel")]
    [ProducesResponseType(typeof(UpdateOrderStatusResponse), StatusCodes.Status200OK)]
    public async Task<ActionResult<UpdateOrderStatusResponse>> CancelOrder(Guid id, [FromBody] CancelOrderRequest request)
    {
        var command = new UpdateOrderStatusCommand
        {
            OrderId = id,
            NewStatus = OrderStatus.Cancelled,
            Notes = request.Reason
        };

        var result = await _mediator.Send(command);
        return Ok(result);
    }

    /// <summary>
    /// Admin: Get order statistics
    /// </summary>
    [HttpGet("statistics")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    public async Task<ActionResult> GetStatistics(
        [FromQuery] DateTime? startDate = null,
        [FromQuery] DateTime? endDate = null)
    {
        var orders = await _mediator.Send(new GetOrdersQuery
        {
            PageNumber = 1,
            PageSize = 10000,
            StartDate = startDate,
            EndDate = endDate
        });

        var stats = new
        {
            TotalOrders = orders.TotalCount,
            PendingOrders = orders.Items.Count(o => o.Status == "Pending"),
            ProcessingOrders = orders.Items.Count(o => o.Status == "Processing"),
            ShippedOrders = orders.Items.Count(o => o.Status == "Shipped"),
            DeliveredOrders = orders.Items.Count(o => o.Status == "Delivered"),
            CancelledOrders = orders.Items.Count(o => o.Status == "Cancelled"),
            TotalRevenue = orders.Items.Where(o => o.Status != "Cancelled").Sum(o => o.TotalAmount),
            AverageOrderValue = orders.Items.Where(o => o.Status != "Cancelled").Any()
                ? orders.Items.Where(o => o.Status != "Cancelled").Average(o => o.TotalAmount)
                : 0,
            TotalTax = orders.Items.Sum(o => o.Tax),
            TotalShipping = orders.Items.Sum(o => o.ShippingCost)
        };

        return Ok(stats);
    }

    /// <summary>
    /// Admin: Get daily sales report
    /// </summary>
    [HttpGet("reports/daily-sales")]
    [ProducesResponseType(typeof(List<object>), StatusCodes.Status200OK)]
    public async Task<ActionResult> GetDailySales(
        [FromQuery] DateTime? startDate = null,
        [FromQuery] DateTime? endDate = null)
    {
        var start = startDate ?? DateTime.UtcNow.AddDays(-30);
        var end = endDate ?? DateTime.UtcNow;

        var orders = await _mediator.Send(new GetOrdersQuery
        {
            PageNumber = 1,
            PageSize = 10000,
            StartDate = start,
            EndDate = end
        });

        var dailySales = orders.Items
            .Where(o => o.Status != "Cancelled")
            .GroupBy(o => o.CreatedAt.Date)
            .Select(g => new
            {
                Date = g.Key,
                OrderCount = g.Count(),
                TotalRevenue = g.Sum(o => o.TotalAmount),
                AverageOrderValue = g.Average(o => o.TotalAmount)
            })
            .OrderBy(x => x.Date)
            .ToList();

        return Ok(dailySales);
    }
}

public class CancelOrderRequest
{
    public string Reason { get; set; } = string.Empty;
}
