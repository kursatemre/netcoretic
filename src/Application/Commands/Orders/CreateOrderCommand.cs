using MediatR;

namespace Application.Commands.Orders;

public class CreateOrderCommand : IRequest<CreateOrderResponse>
{
    public Guid UserId { get; set; }
    public string? Notes { get; set; }
    public List<OrderItemDto> Items { get; set; } = new();
}

public class OrderItemDto
{
    public Guid ProductId { get; set; }
    public Guid? ProductVariationId { get; set; }
    public int Quantity { get; set; }
}

public class CreateOrderResponse
{
    public Guid OrderId { get; set; }
    public string OrderNumber { get; set; } = string.Empty;
    public decimal TotalAmount { get; set; }
    public string Status { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}
