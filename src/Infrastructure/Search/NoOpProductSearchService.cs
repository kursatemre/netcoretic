using Application.Interfaces;
using Domain.Entities;

namespace Infrastructure.Search;

/// <summary>
/// No-operation implementation of IProductSearchService
/// Used when Elasticsearch is not available
/// </summary>
public class NoOpProductSearchService : IProductSearchService
{
    public Task IndexProductAsync(Product product, CancellationToken cancellationToken = default)
    {
        // No operation - Elasticsearch not configured
        return Task.CompletedTask;
    }

    public Task IndexProductsAsync(IEnumerable<Product> products, CancellationToken cancellationToken = default)
    {
        // No operation - Elasticsearch not configured
        return Task.CompletedTask;
    }

    public Task UpdateProductAsync(Product product, CancellationToken cancellationToken = default)
    {
        // No operation - Elasticsearch not configured
        return Task.CompletedTask;
    }

    public Task DeleteProductAsync(Guid productId, CancellationToken cancellationToken = default)
    {
        // No operation - Elasticsearch not configured
        return Task.CompletedTask;
    }

    public Task<SearchResult<Product>> SearchAsync(string query, int pageNumber, int pageSize, CancellationToken cancellationToken = default)
    {
        // Return empty search result - search functionality disabled
        Console.WriteLine("⚠️ Elasticsearch not configured - search functionality disabled");
        return Task.FromResult(new SearchResult<Product>
        {
            Items = new List<Product>(),
            TotalCount = 0,
            PageNumber = pageNumber,
            PageSize = pageSize,
            Facets = new Dictionary<string, List<FacetItem>>()
        });
    }

    public Task<IEnumerable<string>> AutocompleteAsync(string query, int limit, CancellationToken cancellationToken = default)
    {
        // Return empty autocomplete - search functionality disabled
        return Task.FromResult(Enumerable.Empty<string>());
    }

    public Task<SearchResult<Product>> FacetedSearchAsync(
        string query,
        List<Guid>? categoryIds = null,
        List<Guid>? brandIds = null,
        decimal? minPrice = null,
        decimal? maxPrice = null,
        int pageNumber = 1,
        int pageSize = 20,
        CancellationToken cancellationToken = default)
    {
        // Return empty search result - search functionality disabled
        Console.WriteLine("⚠️ Elasticsearch not configured - faceted search functionality disabled");
        return Task.FromResult(new SearchResult<Product>
        {
            Items = new List<Product>(),
            TotalCount = 0,
            PageNumber = pageNumber,
            PageSize = pageSize,
            Facets = new Dictionary<string, List<FacetItem>>()
        });
    }
}
