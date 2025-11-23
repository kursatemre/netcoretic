namespace Domain.Entities;

/// <summary>
/// Ürün entity'si - Varyasyon desteği ile
/// </summary>
public class Product : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? ShortDescription { get; set; }
    public string SKU { get; set; } = string.Empty;
    
    // Temel fiyat (varyasyonlar için temel alınır)
    public decimal BasePrice { get; set; }
    public decimal? DiscountedPrice { get; set; }
    
    // SEO
    public string? MetaTitle { get; set; }
    public string? MetaDescription { get; set; }
    public string? MetaKeywords { get; set; }
    
    // Durum
    public bool IsActive { get; set; }
    public bool IsFeatured { get; set; }
    
    // İlişkiler
    public Guid CategoryId { get; set; }
    public Category Category { get; set; } = null!;
    
    public Guid? BrandId { get; set; }
    public Brand? Brand { get; set; }
    
    // Varyasyonlar - Her ürünün birden fazla varyasyonu olabilir
    public ICollection<ProductVariation> Variations { get; set; } = new List<ProductVariation>();
    
    // Görseller
    public ICollection<ProductImage> Images { get; set; } = new List<ProductImage>();
    
    // Kategoriler (Çoklu kategori desteği)
    public ICollection<ProductCategory> ProductCategories { get; set; } = new List<ProductCategory>();
}
