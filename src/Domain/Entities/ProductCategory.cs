namespace Domain.Entities;

/// <summary>
/// Ürün-Kategori ilişki tablosu (Çoklu kategori desteği)
/// </summary>
public class ProductCategory : BaseEntity
{
    public Guid ProductId { get; set; }
    public Product Product { get; set; } = null!;
    
    public Guid CategoryId { get; set; }
    public Category Category { get; set; } = null!;
    
    public bool IsPrimary { get; set; } // Ana kategori mi?
}
