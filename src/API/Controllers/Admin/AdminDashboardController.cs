using Application.Queries.Orders;
using Application.Queries.Products;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers.Admin;

[ApiController]
[Route("api/admin/[controller]")]
// [Authorize(Roles = "Admin")] // Temporarily disabled for development
public class AdminDashboardController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly UserManager<User> _userManager;

    public AdminDashboardController(IMediator mediator, UserManager<User> userManager)
    {
        _mediator = mediator;
        _userManager = userManager;
    }

    /// <summary>
    /// Admin: Get dashboard overview
    /// </summary>
    [HttpGet("overview")]
    [ProducesResponseType(typeof(DashboardOverviewDto), StatusCodes.Status200OK)]
    public async Task<ActionResult<DashboardOverviewDto>> GetOverview()
    {
        // Get products
        var products = await _mediator.Send(new GetAllProductsQuery
        {
            PageNumber = 1,
            PageSize = 10000
        });

        // Get orders
        var orders = await _mediator.Send(new GetOrdersQuery
        {
            PageNumber = 1,
            PageSize = 10000
        });

        // Get users
        var totalUsers = await _userManager.Users.CountAsync();
        var activeUsers = await _userManager.Users.CountAsync(u => u.IsActive);

        // Calculate statistics
        var today = DateTime.UtcNow.Date;
        var thisMonth = new DateTime(DateTime.UtcNow.Year, DateTime.UtcNow.Month, 1);
        var lastMonth = thisMonth.AddMonths(-1);

        var todayOrders = orders.Items.Count(o => o.CreatedAt.Date == today);
        var thisMonthOrders = orders.Items.Count(o => o.CreatedAt >= thisMonth);
        var lastMonthOrders = orders.Items.Count(o => o.CreatedAt >= lastMonth && o.CreatedAt < thisMonth);

        var todayRevenue = orders.Items
            .Where(o => o.CreatedAt.Date == today && o.Status != OrderStatus.Cancelled)
            .Sum(o => o.TotalAmount);

        var thisMonthRevenue = orders.Items
            .Where(o => o.CreatedAt >= thisMonth && o.Status != OrderStatus.Cancelled)
            .Sum(o => o.TotalAmount);

        var lastMonthRevenue = orders.Items
            .Where(o => o.CreatedAt >= lastMonth && o.CreatedAt < thisMonth && o.Status != OrderStatus.Cancelled)
            .Sum(o => o.TotalAmount);

        var overview = new DashboardOverviewDto
        {
            TotalProducts = products.TotalCount,
            ActiveProducts = products.Items.Count(p => p.IsActive),
            LowStockProducts = products.Items.Count(p => p.StockQuantity < 10),
            
            TotalOrders = orders.TotalCount,
            PendingOrders = orders.Items.Count(o => o.Status == OrderStatus.Pending),
            ProcessingOrders = orders.Items.Count(o => o.Status == OrderStatus.Processing),
            TodayOrders = todayOrders,
            
            TotalRevenue = orders.Items.Where(o => o.Status != OrderStatus.Cancelled).Sum(o => o.TotalAmount),
            TodayRevenue = todayRevenue,
            ThisMonthRevenue = thisMonthRevenue,
            
            TotalUsers = totalUsers,
            ActiveUsers = activeUsers,
            
            OrdersGrowth = lastMonthOrders > 0 
                ? Math.Round(((double)(thisMonthOrders - lastMonthOrders) / lastMonthOrders) * 100, 2)
                : 0,
            
            RevenueGrowth = lastMonthRevenue > 0
                ? Math.Round(((double)(thisMonthRevenue - lastMonthRevenue) / (double)lastMonthRevenue) * 100, 2)
                : 0
        };

        return Ok(overview);
    }

    /// <summary>
    /// Admin: Get recent orders
    /// </summary>
    [HttpGet("recent-orders")]
    [ProducesResponseType(typeof(List<object>), StatusCodes.Status200OK)]
    public async Task<ActionResult> GetRecentOrders([FromQuery] int limit = 10)
    {
        var orders = await _mediator.Send(new GetOrdersQuery
        {
            PageNumber = 1,
            PageSize = limit,
            SortBy = "CreatedAt",
            SortDescending = true
        });

        var recentOrders = orders.Items.Select(o => new
        {
            o.Id,
            o.OrderNumber,
            CustomerName = $"{o.CustomerFirstName} {o.CustomerLastName}",
            o.CustomerEmail,
            o.TotalAmount,
            o.Status,
            o.CreatedAt
        });

        return Ok(recentOrders);
    }

    /// <summary>
    /// Admin: Get top selling products
    /// </summary>
    [HttpGet("top-products")]
    [ProducesResponseType(typeof(List<object>), StatusCodes.Status200OK)]
    public async Task<ActionResult> GetTopProducts([FromQuery] int limit = 10)
    {
        var orders = await _mediator.Send(new GetOrdersQuery
        {
            PageNumber = 1,
            PageSize = 10000
        });

        var topProducts = orders.Items
            .Where(o => o.Status != OrderStatus.Cancelled)
            .SelectMany(o => o.OrderItems)
            .GroupBy(i => i.ProductName)
            .Select(g => new
            {
                ProductName = g.Key,
                TotalQuantity = g.Sum(i => i.Quantity),
                TotalRevenue = g.Sum(i => i.TotalPrice)
            })
            .OrderByDescending(p => p.TotalQuantity)
            .Take(limit)
            .ToList();

        return Ok(topProducts);
    }

    /// <summary>
    /// Admin: Get sales chart data (last 30 days)
    /// </summary>
    [HttpGet("sales-chart")]
    [ProducesResponseType(typeof(List<object>), StatusCodes.Status200OK)]
    public async Task<ActionResult> GetSalesChart([FromQuery] int days = 30)
    {
        var startDate = DateTime.UtcNow.Date.AddDays(-days);
        
        var orders = await _mediator.Send(new GetOrdersQuery
        {
            PageNumber = 1,
            PageSize = 10000,
            StartDate = startDate
        });

        var salesData = orders.Items
            .Where(o => o.Status != OrderStatus.Cancelled)
            .GroupBy(o => o.CreatedAt.Date)
            .Select(g => new
            {
                Date = g.Key.ToString("yyyy-MM-dd"),
                Orders = g.Count(),
                Revenue = g.Sum(o => o.TotalAmount)
            })
            .OrderBy(x => x.Date)
            .ToList();

        // Fill missing dates with zero values
        var allDates = Enumerable.Range(0, days)
            .Select(i => DateTime.UtcNow.Date.AddDays(-days + i + 1))
            .Select(date => new
            {
                Date = date.ToString("yyyy-MM-dd"),
                Orders = salesData.FirstOrDefault(s => s.Date == date.ToString("yyyy-MM-dd"))?.Orders ?? 0,
                Revenue = salesData.FirstOrDefault(s => s.Date == date.ToString("yyyy-MM-dd"))?.Revenue ?? 0
            })
            .ToList();

        return Ok(allDates);
    }
}

public class DashboardOverviewDto
{
    public int TotalProducts { get; set; }
    public int ActiveProducts { get; set; }
    public int LowStockProducts { get; set; }
    
    public int TotalOrders { get; set; }
    public int PendingOrders { get; set; }
    public int ProcessingOrders { get; set; }
    public int TodayOrders { get; set; }
    
    public decimal TotalRevenue { get; set; }
    public decimal TodayRevenue { get; set; }
    public decimal ThisMonthRevenue { get; set; }
    
    public int TotalUsers { get; set; }
    public int ActiveUsers { get; set; }
    
    public double OrdersGrowth { get; set; }
    public double RevenueGrowth { get; set; }
}
