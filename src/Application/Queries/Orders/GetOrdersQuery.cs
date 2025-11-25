using Application.DTOs;
using Domain.Enums;
using MediatR;

namespace Application.Queries.Orders;

public class GetOrdersQuery : IRequest<PagedResult<OrderDto>>
{
    public Guid? UserId { get; set; }
    public OrderStatus? Status { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string? OrderNumber { get; set; }
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 10;
    public string? SortBy { get; set; }
    public bool SortDescending { get; set; } = false;
}
