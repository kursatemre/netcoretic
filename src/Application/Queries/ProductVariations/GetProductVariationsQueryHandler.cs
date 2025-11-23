using Application.DTOs;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Queries.ProductVariations;

public class GetProductVariationsQueryHandler : IRequestHandler<GetProductVariationsQuery, List<ProductVariationDto>>
{
    private readonly IRepository<ProductVariation> _variationRepository;

    public GetProductVariationsQueryHandler(IRepository<ProductVariation> variationRepository)
    {
        _variationRepository = variationRepository;
    }

    public async Task<List<ProductVariationDto>> Handle(GetProductVariationsQuery request, CancellationToken cancellationToken)
    {
        var variations = await _variationRepository.GetAllQueryable()
            .Where(v => v.ProductId == request.ProductId)
            .Include(v => v.Attributes)
                .ThenInclude(a => a.Attribute)
            .Include(v => v.Attributes)
                .ThenInclude(a => a.AttributeValue)
            .Select(v => new ProductVariationDto
            {
                Id = v.Id,
                SKU = v.SKU,
                Name = v.Name,
                PriceAdjustment = v.PriceAdjustment,
                DiscountedPrice = v.DiscountedPrice,
                StockQuantity = v.StockQuantity,
                IsActive = v.IsActive,
                IsDefault = v.IsDefault,
                Attributes = v.Attributes.Select(a => new ProductVariationAttributeDto
                {
                    AttributeName = a.Attribute.Name,
                    AttributeValue = a.AttributeValue.Value,
                    ColorCode = a.AttributeValue.ColorCode
                }).ToList()
            })
            .ToListAsync(cancellationToken);

        return variations;
    }
}
