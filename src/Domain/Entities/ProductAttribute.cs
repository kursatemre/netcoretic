namespace Domain.Entities;

/// <summary>
/// Ürün özelliği tanımı - Renk, Beden, Materyal vb.
/// </summary>
public class ProductAttribute : BaseEntity
{
    public string Name { get; set; } = string.Empty; // Renk, Beden, Materyal
    public string Slug { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; }
    
    // Özellik değerleri
    public ICollection<ProductAttributeValue> Values { get; set; } = new List<ProductAttributeValue>();
}
