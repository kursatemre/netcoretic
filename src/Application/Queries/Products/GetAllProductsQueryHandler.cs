using Application.DTOs;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Queries.Products;

public class GetAllProductsQueryHandler : IRequestHandler<GetAllProductsQuery, PagedResult<ProductDto>>
{
    private readonly IRepository<Product> _productRepository;

    public GetAllProductsQueryHandler(IRepository<Product> productRepository)
    {
        _productRepository = productRepository;
    }

    public async Task<PagedResult<ProductDto>> Handle(GetAllProductsQuery request, CancellationToken cancellationToken)
    {
        var query = _productRepository.GetAllQueryable()
            .Include(p => p.Category)
            .Include(p => p.Brand)
            .AsQueryable();

        // Search filter
        if (!string.IsNullOrWhiteSpace(request.SearchTerm))
        {
            var searchTerm = request.SearchTerm.ToLower();
            query = query.Where(p =>
                p.Name.ToLower().Contains(searchTerm) ||
                p.Description.ToLower().Contains(searchTerm) ||
                p.SKU.ToLower().Contains(searchTerm));
        }

        // Category filter
        if (request.CategoryId.HasValue)
        {
            query = query.Where(p => p.CategoryId == request.CategoryId.Value);
        }

        // Brand filter
        if (request.BrandId.HasValue)
        {
            query = query.Where(p => p.BrandId == request.BrandId.Value);
        }

        // Price range filter
        if (request.MinPrice.HasValue)
        {
            query = query.Where(p => p.BasePrice >= request.MinPrice.Value);
        }

        if (request.MaxPrice.HasValue)
        {
            query = query.Where(p => p.BasePrice <= request.MaxPrice.Value);
        }

        // Active filter
        if (request.IsActive.HasValue)
        {
            query = query.Where(p => p.IsActive == request.IsActive.Value);
        }

        // Featured filter
        if (request.IsFeatured.HasValue)
        {
            query = query.Where(p => p.IsFeatured == request.IsFeatured.Value);
        }

        // Get total count
        var totalCount = await query.CountAsync(cancellationToken);

        // Sorting
        query = request.SortBy?.ToLower() switch
        {
            "name" => request.SortDescending ? query.OrderByDescending(p => p.Name) : query.OrderBy(p => p.Name),
            "price" => request.SortDescending ? query.OrderByDescending(p => p.BasePrice) : query.OrderBy(p => p.BasePrice),
            "createdat" => request.SortDescending ? query.OrderByDescending(p => p.CreatedAt) : query.OrderBy(p => p.CreatedAt),
            _ => query.OrderByDescending(p => p.CreatedAt)
        };

        // Pagination
        var products = await query
            .Skip((request.PageNumber - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(p => new ProductDto
            {
                Id = p.Id,
                Name = p.Name,
                Slug = p.Slug,
                Description = p.Description,
                ShortDescription = p.ShortDescription,
                SKU = p.SKU,
                BasePrice = p.BasePrice,
                DiscountedPrice = p.DiscountedPrice,
                IsActive = p.IsActive,
                IsFeatured = p.IsFeatured,
                Category = p.Category != null ? new CategoryDto
                {
                    Id = p.Category.Id,
                    Name = p.Category.Name,
                    Slug = p.Category.Slug
                } : null,
                Brand = p.Brand != null ? new BrandDto
                {
                    Id = p.Brand.Id,
                    Name = p.Brand.Name,
                    Slug = p.Brand.Slug
                } : null,
                CreatedAt = p.CreatedAt
            })
            .ToListAsync(cancellationToken);

        return new PagedResult<ProductDto>
        {
            Items = products,
            TotalCount = totalCount,
            PageNumber = request.PageNumber,
            PageSize = request.PageSize
        };
    }
}
