using Application.DTOs;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Queries.Orders;

public class GetOrdersQueryHandler : IRequestHandler<GetOrdersQuery, PagedResult<OrderDto>>
{
    private readonly IRepository<Order> _orderRepository;
    private readonly IRepository<OrderItem> _orderItemRepository;

    public GetOrdersQueryHandler(
        IRepository<Order> orderRepository,
        IRepository<OrderItem> orderItemRepository)
    {
        _orderRepository = orderRepository;
        _orderItemRepository = orderItemRepository;
    }

    public async Task<PagedResult<OrderDto>> Handle(GetOrdersQuery request, CancellationToken cancellationToken)
    {
        var query = _orderRepository.GetAllQueryable();

        // Apply filters
        if (request.UserId.HasValue)
        {
            query = query.Where(o => o.UserId == request.UserId.Value);
        }

        if (request.Status.HasValue)
        {
            query = query.Where(o => o.Status == request.Status.Value);
        }

        if (request.StartDate.HasValue)
        {
            query = query.Where(o => o.CreatedAt >= request.StartDate.Value);
        }

        if (request.EndDate.HasValue)
        {
            query = query.Where(o => o.CreatedAt <= request.EndDate.Value);
        }

        if (!string.IsNullOrWhiteSpace(request.OrderNumber))
        {
            query = query.Where(o => o.OrderNumber.Contains(request.OrderNumber));
        }

        // Get total count
        var totalCount = query.Count();

        // Apply pagination
        var orders = query
            .Include(o => o.User)
            .OrderByDescending(o => o.CreatedAt)
            .Skip((request.PageNumber - 1) * request.PageSize)
            .Take(request.PageSize)
            .ToList();

        // Get order items for all orders
        var orderIds = orders.Select(o => o.Id).ToList();
        var allOrderItems = await _orderItemRepository.GetAllAsync();
        var orderItems = allOrderItems.Where(oi => orderIds.Contains(oi.OrderId)).ToList();

        // Map to DTOs
        var orderDtos = orders.Select(order => new OrderDto
        {
            Id = order.Id,
            OrderNumber = order.OrderNumber,
            CustomerFirstName = order.User?.FirstName,
            CustomerLastName = order.User?.LastName,
            CustomerEmail = order.User?.Email,
            Status = order.Status,
            PaymentStatus = order.PaymentStatus,
            ShippingStatus = order.ShippingStatus,
            SubTotal = order.SubTotal,
            ShippingCost = order.ShippingCost,
            TaxAmount = order.TaxAmount,
            DiscountAmount = order.DiscountAmount,
            TotalAmount = order.TotalAmount,
            CreatedAt = order.CreatedAt,
            OrderItems = orderItems
                .Where(oi => oi.OrderId == order.Id)
                .Select(oi => new OrderItemDto
                {
                    Id = oi.Id,
                    ProductName = oi.ProductName,
                    VariationName = oi.VariationName,
                    SKU = oi.SKU,
                    Quantity = oi.Quantity,
                    UnitPrice = oi.UnitPrice,
                    TotalPrice = oi.TotalPrice
                })
                .ToList()
        }).ToList();

        return new PagedResult<OrderDto>
        {
            Items = orderDtos,
            TotalCount = totalCount,
            PageNumber = request.PageNumber,
            PageSize = request.PageSize
        };
    }
}
