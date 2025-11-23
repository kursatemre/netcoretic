using Domain.Enums;
using MediatR;

namespace Application.Commands.Orders;

public class UpdateOrderStatusCommand : IRequest<UpdateOrderStatusResponse>
{
    public Guid OrderId { get; set; }
    public OrderStatus NewStatus { get; set; }
    public string? Notes { get; set; }
}

public class UpdateOrderStatusResponse
{
    public Guid OrderId { get; set; }
    public string OrderNumber { get; set; } = string.Empty;
    public string OldStatus { get; set; } = string.Empty;
    public string NewStatus { get; set; } = string.Empty;
    public DateTime UpdatedAt { get; set; }
}
