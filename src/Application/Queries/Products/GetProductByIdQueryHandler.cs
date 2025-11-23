using Application.DTOs;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace Application.Queries.Products;

/// <summary>
/// GetProductByIdQuery için Handler
/// </summary>
public class GetProductByIdQueryHandler : IRequestHandler<GetProductByIdQuery, ProductDto?>
{
    private readonly IRepository<Product> _productRepository;

    public GetProductByIdQueryHandler(IRepository<Product> productRepository)
    {
        _productRepository = productRepository;
    }

    public async Task<ProductDto?> Handle(GetProductByIdQuery request, CancellationToken cancellationToken)
    {
        var product = await _productRepository.GetByIdAsync(request.ProductId, cancellationToken);

        if (product == null)
            return null;

        return new ProductDto
        {
            Id = product.Id,
            Name = product.Name,
            Slug = product.Slug,
            Description = product.Description,
            ShortDescription = product.ShortDescription,
            SKU = product.SKU,
            BasePrice = product.BasePrice,
            DiscountedPrice = product.DiscountedPrice,
            IsActive = product.IsActive,
            IsFeatured = product.IsFeatured
        };
    }
}
