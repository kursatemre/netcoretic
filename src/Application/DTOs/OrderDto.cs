namespace Application.DTOs;

/// <summary>
/// Sipariş DTO
/// </summary>
public class OrderDto
{
    public Guid Id { get; set; }
    public string OrderNumber { get; set; } = string.Empty;
    public decimal SubTotal { get; set; }
    public decimal ShippingCost { get; set; }
    public decimal TaxAmount { get; set; }
    public decimal DiscountAmount { get; set; }
    public decimal TotalAmount { get; set; }
    public string Status { get; set; } = string.Empty;
    public string PaymentStatus { get; set; } = string.Empty;
    public string ShippingStatus { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public List<OrderItemDto> OrderItems { get; set; } = new();
}

public class OrderItemDto
{
    public Guid Id { get; set; }
    public string ProductName { get; set; } = string.Empty;
    public string? VariationName { get; set; }
    public string SKU { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal TotalPrice { get; set; }
}
