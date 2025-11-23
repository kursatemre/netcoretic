using Application.DTOs;
using MediatR;

namespace Application.Commands.Products;

/// <summary>
/// Yeni ürün oluşturma komutu
/// </summary>
public record CreateProductCommand : IRequest<ProductDto>
{
    public string Name { get; init; } = string.Empty;
    public string Slug { get; init; } = string.Empty;
    public string Description { get; init; } = string.Empty;
    public string? ShortDescription { get; init; }
    public string SKU { get; init; } = string.Empty;
    public decimal BasePrice { get; init; }
    public decimal? DiscountedPrice { get; init; }
    public Guid CategoryId { get; init; }
    public Guid? BrandId { get; init; }
    public bool IsActive { get; init; } = true;
    public bool IsFeatured { get; init; }
    public List<string> ImageUrls { get; init; } = new();
}
