using Application.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Queries.Products;

public class FacetedSearchProductsQuery : IRequest<SearchResult<Product>>
{
    public string Query { get; set; } = string.Empty;
    public List<Guid>? CategoryIds { get; set; }
    public List<Guid>? BrandIds { get; set; }
    public decimal? MinPrice { get; set; }
    public decimal? MaxPrice { get; set; }
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 20;
}

public class FacetedSearchProductsQueryHandler : IRequestHandler<FacetedSearchProductsQuery, SearchResult<Product>>
{
    private readonly IProductSearchService _searchService;

    public FacetedSearchProductsQueryHandler(IProductSearchService searchService)
    {
        _searchService = searchService;
    }

    public async Task<SearchResult<Product>> Handle(FacetedSearchProductsQuery request, CancellationToken cancellationToken)
    {
        return await _searchService.FacetedSearchAsync(
            request.Query,
            request.CategoryIds,
            request.BrandIds,
            request.MinPrice,
            request.MaxPrice,
            request.PageNumber,
            request.PageSize,
            cancellationToken
        );
    }
}
