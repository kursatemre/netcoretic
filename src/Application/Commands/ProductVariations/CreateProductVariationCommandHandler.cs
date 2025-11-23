using Application.DTOs;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace Application.Commands.ProductVariations;

public class CreateProductVariationCommandHandler : IRequestHandler<CreateProductVariationCommand, ProductVariationDto>
{
    private readonly IRepository<Product> _productRepository;
    private readonly IRepository<ProductVariation> _variationRepository;
    private readonly IRepository<ProductVariationAttribute> _variationAttributeRepository;
    private readonly IUnitOfWork _unitOfWork;

    public CreateProductVariationCommandHandler(
        IRepository<Product> productRepository,
        IRepository<ProductVariation> variationRepository,
        IRepository<ProductVariationAttribute> variationAttributeRepository,
        IUnitOfWork unitOfWork)
    {
        _productRepository = productRepository;
        _variationRepository = variationRepository;
        _variationAttributeRepository = variationAttributeRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<ProductVariationDto> Handle(CreateProductVariationCommand request, CancellationToken cancellationToken)
    {
        // Verify product exists
        var product = await _productRepository.GetByIdAsync(request.ProductId, cancellationToken);
        if (product == null)
            throw new KeyNotFoundException($"Product with ID {request.ProductId} not found");

        // Create variation
        var variation = new ProductVariation
        {
            ProductId = request.ProductId,
            SKU = request.SKU,
            Name = request.Name,
            PriceAdjustment = request.PriceAdjustment,
            DiscountedPrice = request.DiscountedPrice,
            StockQuantity = request.StockQuantity,
            LowStockThreshold = request.LowStockThreshold,
            IsActive = request.IsActive,
            IsDefault = request.IsDefault,
            CreatedAt = DateTime.UtcNow
        };

        await _variationRepository.AddAsync(variation, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        // Add attributes
        foreach (var attr in request.Attributes)
        {
            var variationAttribute = new ProductVariationAttribute
            {
                ProductVariationId = variation.Id,
                AttributeId = attr.AttributeId,
                AttributeValueId = attr.AttributeValueId,
                CreatedAt = DateTime.UtcNow
            };
            await _variationAttributeRepository.AddAsync(variationAttribute, cancellationToken);
        }

        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return new ProductVariationDto
        {
            Id = variation.Id,
            SKU = variation.SKU,
            Name = variation.Name,
            PriceAdjustment = variation.PriceAdjustment,
            DiscountedPrice = variation.DiscountedPrice,
            StockQuantity = variation.StockQuantity,
            IsActive = variation.IsActive,
            IsDefault = variation.IsDefault
        };
    }
}
