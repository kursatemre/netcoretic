namespace Domain.Entities;

/// <summary>
/// Sipariş kalemi - Siparişteki her ürün
/// </summary>
public class OrderItem : BaseEntity
{
    public Guid OrderId { get; set; }
    public Order Order { get; set; } = null!;
    
    public Guid ProductId { get; set; }
    public Product Product { get; set; } = null!;
    
    public Guid? ProductVariationId { get; set; }
    public ProductVariation? ProductVariation { get; set; }
    
    public string ProductName { get; set; } = string.Empty;
    public string? VariationName { get; set; }
    public string SKU { get; set; } = string.Empty;
    
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal TotalPrice { get; set; }
    public decimal? DiscountAmount { get; set; }
}
