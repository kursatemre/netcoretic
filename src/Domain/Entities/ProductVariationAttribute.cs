namespace Domain.Entities;

/// <summary>
/// Varyasyon özelliği - Bir varyasyonun sahip olduğu özellikler
/// Örn: Renk=Kırmızı, Beden=XL
/// </summary>
public class ProductVariationAttribute : BaseEntity
{
    public Guid ProductVariationId { get; set; }
    public ProductVariation ProductVariation { get; set; } = null!;
    
    public Guid AttributeId { get; set; }
    public ProductAttribute Attribute { get; set; } = null!;
    
    public Guid AttributeValueId { get; set; }
    public ProductAttributeValue AttributeValue { get; set; } = null!;
}
