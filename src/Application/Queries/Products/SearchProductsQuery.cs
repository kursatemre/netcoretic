using Application.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Queries.Products;

public class SearchProductsQuery : IRequest<SearchResult<Product>>
{
    public string Query { get; set; } = string.Empty;
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 20;
}

public class SearchProductsQueryHandler : IRequestHandler<SearchProductsQuery, SearchResult<Product>>
{
    private readonly IProductSearchService _searchService;

    public SearchProductsQueryHandler(IProductSearchService searchService)
    {
        _searchService = searchService;
    }

    public async Task<SearchResult<Product>> Handle(SearchProductsQuery request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Query))
        {
            return new SearchResult<Product>
            {
                Items = new List<Product>(),
                TotalCount = 0,
                PageNumber = request.PageNumber,
                PageSize = request.PageSize
            };
        }

        return await _searchService.SearchAsync(request.Query, request.PageNumber, request.PageSize, cancellationToken);
    }
}
