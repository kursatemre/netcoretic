namespace Domain.Entities;

/// <summary>
/// Kategoriye özel özellikler - Her kategorinin farklı filtreleme özellikleri olabilir
/// Örn: Elektronik kategorisinde "Ekran Boyutu", Giyim'de "Kumaş Tipi"
/// </summary>
public class CategoryAttribute : BaseEntity
{
    public Guid CategoryId { get; set; }
    public Category Category { get; set; } = null!;
    
    public Guid AttributeId { get; set; }
    public ProductAttribute Attribute { get; set; } = null!;
    
    public bool IsRequired { get; set; }
    public bool IsFilterable { get; set; }
    public int DisplayOrder { get; set; }
}
