namespace Domain.Entities;

/// <summary>
/// Ürün özelliği değeri - Kırmızı, XL, Pamuk vb.
/// </summary>
public class ProductAttributeValue : BaseEntity
{
    public Guid AttributeId { get; set; }
    public ProductAttribute Attribute { get; set; } = null!;
    
    public string Value { get; set; } = string.Empty; // Kırmızı, XL, Pamuk
    public string? ColorCode { get; set; } // Renk kodları için (HEX)
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; }
}
