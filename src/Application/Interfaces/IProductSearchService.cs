using Domain.Entities;

namespace Application.Interfaces;

public interface IProductSearchService
{
    Task IndexProductAsync(Product product, CancellationToken cancellationToken = default);
    Task IndexProductsAsync(IEnumerable<Product> products, CancellationToken cancellationToken = default);
    Task UpdateProductAsync(Product product, CancellationToken cancellationToken = default);
    Task DeleteProductAsync(Guid productId, CancellationToken cancellationToken = default);
    Task<SearchResult<Product>> SearchAsync(string query, int pageNumber, int pageSize, CancellationToken cancellationToken = default);
    Task<IEnumerable<string>> AutocompleteAsync(string query, int limit, CancellationToken cancellationToken = default);
    Task<SearchResult<Product>> FacetedSearchAsync(
        string query,
        List<Guid>? categoryIds = null,
        List<Guid>? brandIds = null,
        decimal? minPrice = null,
        decimal? maxPrice = null,
        int pageNumber = 1,
        int pageSize = 20,
        CancellationToken cancellationToken = default);
}

public class SearchResult<T>
{
    public List<T> Items { get; set; } = new();
    public long TotalCount { get; set; }
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public Dictionary<string, List<FacetItem>> Facets { get; set; } = new();
}

public class FacetItem
{
    public string Key { get; set; } = string.Empty;
    public long Count { get; set; }
}
