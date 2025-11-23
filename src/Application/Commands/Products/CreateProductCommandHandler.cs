using Application.DTOs;
using Application.Interfaces;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace Application.Commands.Products;

/// <summary>
/// CreateProductCommand için Handler
/// </summary>
public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, ProductDto>
{
    private readonly IRepository<Product> _productRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IProductSearchService _searchService;

    public CreateProductCommandHandler(
        IRepository<Product> productRepository,
        IUnitOfWork unitOfWork,
        IProductSearchService searchService)
    {
        _productRepository = productRepository;
        _unitOfWork = unitOfWork;
        _searchService = searchService;
    }

    public async Task<ProductDto> Handle(CreateProductCommand request, CancellationToken cancellationToken)
    {
        var product = new Product
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Slug = request.Slug,
            Description = request.Description,
            ShortDescription = request.ShortDescription,
            SKU = request.SKU,
            BasePrice = request.BasePrice,
            DiscountedPrice = request.DiscountedPrice,
            CategoryId = request.CategoryId,
            BrandId = request.BrandId,
            IsActive = request.IsActive,
            IsFeatured = request.IsFeatured,
            CreatedAt = DateTime.UtcNow
        };

        // Görselleri ekle
        if (request.ImageUrls.Any())
        {
            int order = 1;
            foreach (var imageUrl in request.ImageUrls)
            {
                product.Images.Add(new ProductImage
                {
                    Id = Guid.NewGuid(),
                    ImageUrl = imageUrl,
                    DisplayOrder = order,
                    IsDefault = order == 1,
                    CreatedAt = DateTime.UtcNow
                });
                order++;
            }
        }

        await _productRepository.AddAsync(product, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        // Index product in Elasticsearch
        try
        {
            await _searchService.IndexProductAsync(product, cancellationToken);
        }
        catch (Exception ex)
        {
            // Log error but don't fail the operation
            Console.WriteLine($"Failed to index product in Elasticsearch: {ex.Message}");
        }

        return new ProductDto
        {
            Id = product.Id,
            Name = product.Name,
            Slug = product.Slug,
            Description = product.Description,
            SKU = product.SKU,
            BasePrice = product.BasePrice,
            DiscountedPrice = product.DiscountedPrice,
            IsActive = product.IsActive,
            IsFeatured = product.IsFeatured
        };
    }
}
