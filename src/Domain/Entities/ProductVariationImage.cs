namespace Domain.Entities;

/// <summary>
/// Varyasyona özel görsel
/// </summary>
public class ProductVariationImage : BaseEntity
{
    public Guid ProductVariationId { get; set; }
    public ProductVariation ProductVariation { get; set; } = null!;
    
    public string ImageUrl { get; set; } = string.Empty;
    public string? ThumbnailUrl { get; set; }
    public string? AltText { get; set; }
    public int DisplayOrder { get; set; }
    public bool IsDefault { get; set; }
}
