using Application.DTOs;
using MediatR;

namespace Application.Commands.ProductVariations;

public class CreateProductVariationCommand : IRequest<ProductVariationDto>
{
    public Guid ProductId { get; set; }
    public string SKU { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public decimal? PriceAdjustment { get; set; }
    public decimal? DiscountedPrice { get; set; }
    public int StockQuantity { get; set; }
    public int? LowStockThreshold { get; set; }
    public bool IsActive { get; set; } = true;
    public bool IsDefault { get; set; }
    public List<VariationAttributeInput> Attributes { get; set; } = new();
}

public class VariationAttributeInput
{
    public Guid AttributeId { get; set; }
    public Guid AttributeValueId { get; set; }
}
