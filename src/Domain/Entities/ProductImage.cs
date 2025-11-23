namespace Domain.Entities;

/// <summary>
/// Ürün görseli
/// </summary>
public class ProductImage : BaseEntity
{
    public Guid ProductId { get; set; }
    public Product Product { get; set; } = null!;
    
    public string ImageUrl { get; set; } = string.Empty;
    public string? ThumbnailUrl { get; set; }
    public string? AltText { get; set; }
    public int DisplayOrder { get; set; }
    public bool IsDefault { get; set; }
}
