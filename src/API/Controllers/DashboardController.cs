using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Infrastructure.Data;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public DashboardController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("overview")]
    public async Task<IActionResult> GetOverview()
    {
        var today = DateTime.UtcNow.Date;
        var lastMonth = today.AddMonths(-1);

        var totalOrders = await _context.Orders.CountAsync();
        var totalProducts = await _context.Products.CountAsync();
        var activeProducts = await _context.Products.CountAsync(p => p.IsActive);
        var lowStockProducts = await _context.ProductVariants.CountAsync(v => v.StockQuantity < 10);
        var totalUsers = await _context.Users.CountAsync();

        var todayOrders = await _context.Orders
            .Where(o => o.CreatedAt.Date == today)
            .CountAsync();

        var todayRevenue = await _context.Orders
            .Where(o => o.CreatedAt.Date == today)
            .SumAsync(o => (decimal?)o.TotalAmount) ?? 0;

        var totalRevenue = await _context.Orders
            .SumAsync(o => (decimal?)o.TotalAmount) ?? 0;

        var pendingOrders = await _context.Orders
            .CountAsync(o => o.Status == Domain.Enums.OrderStatus.Pending);

        var processingOrders = await _context.Orders
            .CountAsync(o => o.Status == Domain.Enums.OrderStatus.Processing);

        // Calculate growth (this month vs last month)
        var thisMonthOrders = await _context.Orders
            .Where(o => o.CreatedAt >= lastMonth)
            .CountAsync();

        var lastMonthOrders = await _context.Orders
            .Where(o => o.CreatedAt >= lastMonth.AddMonths(-1) && o.CreatedAt < lastMonth)
            .CountAsync();

        var ordersGrowth = lastMonthOrders > 0 
            ? ((thisMonthOrders - lastMonthOrders) / (double)lastMonthOrders) * 100 
            : 0;

        var thisMonthRevenue = await _context.Orders
            .Where(o => o.CreatedAt >= lastMonth)
            .SumAsync(o => (decimal?)o.TotalAmount) ?? 0;

        var lastMonthRevenue = await _context.Orders
            .Where(o => o.CreatedAt >= lastMonth.AddMonths(-1) && o.CreatedAt < lastMonth)
            .SumAsync(o => (decimal?)o.TotalAmount) ?? 0;

        var revenueGrowth = lastMonthRevenue > 0 
            ? (double)((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 
            : 0;

        return Ok(new
        {
            totalRevenue,
            totalOrders,
            totalProducts,
            activeProducts,
            lowStockProducts,
            totalUsers,
            activeUsers = totalUsers,
            todayOrders,
            todayRevenue,
            pendingOrders,
            processingOrders,
            ordersGrowth = Math.Round(ordersGrowth, 1),
            revenueGrowth = Math.Round(revenueGrowth, 1)
        });
    }

    [HttpGet("recent-orders")]
    public async Task<IActionResult> GetRecentOrders([FromQuery] int limit = 5)
    {
        var orders = await _context.Orders
            .Include(o => o.User)
            .OrderByDescending(o => o.CreatedAt)
            .Take(limit)
            .Select(o => new
            {
                o.Id,
                o.OrderNumber,
                CustomerName = o.User != null ? $"{o.User.FirstName} {o.User.LastName}" : "Misafir",
                CustomerEmail = o.User != null ? o.User.Email : "",
                o.TotalAmount,
                Status = o.Status.ToString(),
                o.CreatedAt
            })
            .ToListAsync();

        return Ok(orders);
    }

    [HttpGet("sales-chart")]
    public async Task<IActionResult> GetSalesChart([FromQuery] int days = 7)
    {
        var startDate = DateTime.UtcNow.Date.AddDays(-days + 1);
        
        var salesData = await _context.Orders
            .Where(o => o.CreatedAt >= startDate)
            .GroupBy(o => o.CreatedAt.Date)
            .Select(g => new
            {
                Date = g.Key,
                Revenue = g.Sum(o => o.TotalAmount),
                Orders = g.Count()
            })
            .OrderBy(x => x.Date)
            .ToListAsync();

        // Fill in missing days with zero
        var result = new List<object>();
        for (int i = 0; i < days; i++)
        {
            var date = startDate.AddDays(i);
            var data = salesData.FirstOrDefault(x => x.Date == date);
            result.Add(new
            {
                date = date.ToString("yyyy-MM-dd"),
                revenue = data?.Revenue ?? 0,
                orders = data?.Orders ?? 0
            });
        }

        return Ok(result);
    }

    [HttpGet("top-products")]
    public async Task<IActionResult> GetTopProducts([FromQuery] int limit = 5)
    {
        var topProducts = await _context.OrderItems
            .Include(oi => oi.Product)
            .GroupBy(oi => new { oi.ProductId, oi.Product!.Name })
            .Select(g => new
            {
                ProductId = g.Key.ProductId,
                ProductName = g.Key.Name,
                TotalQuantity = g.Sum(x => x.Quantity),
                TotalRevenue = g.Sum(x => x.UnitPrice * x.Quantity)
            })
            .OrderByDescending(x => x.TotalQuantity)
            .Take(limit)
            .ToListAsync();

        return Ok(topProducts);
    }
}
