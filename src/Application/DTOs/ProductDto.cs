namespace Application.DTOs;

/// <summary>
/// Ürün DTO
/// </summary>
public class ProductDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? ShortDescription { get; set; }
    public string SKU { get; set; } = string.Empty;
    public decimal BasePrice { get; set; }
    public decimal? DiscountedPrice { get; set; }
    public bool IsActive { get; set; }
    public bool IsFeatured { get; set; }
    public int StockQuantity { get; set; }
    public DateTime CreatedAt { get; set; }

    public CategoryDto? Category { get; set; }
    public BrandDto? Brand { get; set; }
    public List<ProductVariationDto> Variations { get; set; } = new();
    public List<ProductImageDto> Images { get; set; } = new();
}

public class ProductImageDto
{
    public Guid Id { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public string? ThumbnailUrl { get; set; }
    public string? AltText { get; set; }
    public int DisplayOrder { get; set; }
    public bool IsDefault { get; set; }
}

public class ProductVariationDto
{
    public Guid Id { get; set; }
    public string SKU { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public decimal? PriceAdjustment { get; set; }
    public decimal? DiscountedPrice { get; set; }
    public int StockQuantity { get; set; }
    public bool IsActive { get; set; }
    public bool IsDefault { get; set; }
    public List<ProductVariationAttributeDto> Attributes { get; set; } = new();
    public List<ProductVariationImageDto> Images { get; set; } = new();
}

public class ProductVariationAttributeDto
{
    public string AttributeName { get; set; } = string.Empty;
    public string AttributeValue { get; set; } = string.Empty;
    public string? ColorCode { get; set; }
}

public class ProductVariationImageDto
{
    public Guid Id { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public string? ThumbnailUrl { get; set; }
    public bool IsDefault { get; set; }
}
