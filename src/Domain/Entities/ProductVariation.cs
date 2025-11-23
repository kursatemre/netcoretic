namespace Domain.Entities;

/// <summary>
/// Ürün varyasyonu - Renk, beden, materyal gibi özellikler
/// Her varyasyonun kendi stok, fiyat ve görselleri olabilir
/// </summary>
public class ProductVariation : BaseEntity
{
    public Guid ProductId { get; set; }
    public Product Product { get; set; } = null!;
    
    public string SKU { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty; // Örn: "Kırmızı - XL"
    
    // Fiyat - BasePrice'tan farklı olabilir
    public decimal? PriceAdjustment { get; set; } // +/- miktar
    public decimal? DiscountedPrice { get; set; }
    
    // Stok
    public int StockQuantity { get; set; }
    public int? LowStockThreshold { get; set; }
    
    // Durum
    public bool IsActive { get; set; }
    public bool IsDefault { get; set; } // Varsayılan varyasyon mu?
    
    // Varyasyon özellikleri (Renk: Kırmızı, Beden: XL vb.)
    public ICollection<ProductVariationAttribute> Attributes { get; set; } = new List<ProductVariationAttribute>();
    
    // Varyasyona özel görseller
    public ICollection<ProductVariationImage> Images { get; set; } = new List<ProductVariationImage>();
}
