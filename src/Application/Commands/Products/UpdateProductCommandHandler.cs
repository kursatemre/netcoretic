using Application.DTOs;
using Application.Interfaces;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace Application.Commands.Products;

public class UpdateProductCommandHandler : IRequestHandler<UpdateProductCommand, ProductDto>
{
    private readonly IRepository<Product> _productRepository;
    private readonly IRepository<Category> _categoryRepository;
    private readonly IRepository<Brand> _brandRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IProductSearchService _searchService;

    public UpdateProductCommandHandler(
        IRepository<Product> productRepository,
        IRepository<Category> categoryRepository,
        IRepository<Brand> brandRepository,
        IUnitOfWork unitOfWork,
        IProductSearchService searchService)
    {
        _productRepository = productRepository;
        _categoryRepository = categoryRepository;
        _brandRepository = brandRepository;
        _unitOfWork = unitOfWork;
        _searchService = searchService;
    }

    public async Task<ProductDto> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
    {
        var product = await _productRepository.GetByIdAsync(request.Id, cancellationToken);
        if (product == null)
            throw new KeyNotFoundException($"Product with ID {request.Id} not found");

        // Verify category exists
        var categoryExists = await _categoryRepository.ExistsAsync(request.CategoryId, cancellationToken);
        if (!categoryExists)
            throw new ArgumentException($"Category with ID {request.CategoryId} not found");

        // Verify brand exists if provided
        if (request.BrandId.HasValue)
        {
            var brandExists = await _brandRepository.ExistsAsync(request.BrandId.Value, cancellationToken);
            if (!brandExists)
                throw new ArgumentException($"Brand with ID {request.BrandId} not found");
        }

        // Update properties
        product.Name = request.Name;
        product.Slug = request.Slug;
        product.Description = request.Description;
        product.ShortDescription = request.ShortDescription;
        product.SKU = request.SKU;
        product.BasePrice = request.BasePrice;
        product.DiscountedPrice = request.DiscountedPrice;
        product.CategoryId = request.CategoryId;
        product.BrandId = request.BrandId;
        product.IsActive = request.IsActive;
        product.IsFeatured = request.IsFeatured;
        product.UpdatedAt = DateTime.UtcNow;

        await _productRepository.UpdateAsync(product, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        // Update product in Elasticsearch
        try
        {
            await _searchService.UpdateProductAsync(product, cancellationToken);
        }
        catch (Exception ex)
        {
            // Log error but don't fail the operation
            Console.WriteLine($"Failed to update product in Elasticsearch: {ex.Message}");
        }

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
            IsFeatured = product.IsFeatured,
            CreatedAt = product.CreatedAt
        };
    }
}
