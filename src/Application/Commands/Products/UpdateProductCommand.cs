using Application.DTOs;
using MediatR;

namespace Application.Commands.Products;

public class UpdateProductCommand : IRequest<ProductDto>
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? ShortDescription { get; set; }
    public string SKU { get; set; } = string.Empty;
    public decimal BasePrice { get; set; }
    public decimal? DiscountedPrice { get; set; }
    public Guid CategoryId { get; set; }
    public Guid? BrandId { get; set; }
    public bool IsActive { get; set; }
    public bool IsFeatured { get; set; }
}
