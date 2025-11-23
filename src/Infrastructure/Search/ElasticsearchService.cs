using Application.Interfaces;
using Domain.Entities;
using Nest;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Search;

public class ElasticsearchService : IProductSearchService
{
    private readonly IElasticClient _client;
    private const string ProductIndexName = "products";

    public ElasticsearchService(IConfiguration configuration)
    {
        var uri = configuration["Elasticsearch:Uri"] ?? "http://localhost:9200";
        var settings = new ConnectionSettings(new Uri(uri))
            .DefaultIndex(ProductIndexName)
            .DefaultMappingFor<Product>(m => m
                .IndexName(ProductIndexName)
                .IdProperty(p => p.Id)
            );

        _client = new ElasticClient(settings);
        
        // Create index if it doesn't exist
        CreateIndexIfNotExists();
    }

    private void CreateIndexIfNotExists()
    {
        var existsResponse = _client.Indices.Exists(ProductIndexName);
        if (!existsResponse.Exists)
        {
            _client.Indices.Create(ProductIndexName, c => c
                .Map<Product>(m => m
                    .AutoMap()
                    .Properties(ps => ps
                        .Text(t => t
                            .Name(n => n.Name)
                            .Analyzer("standard")
                            .Fields(f => f
                                .Keyword(k => k.Name("keyword"))
                            )
                        )
                        .Text(t => t
                            .Name(n => n.Description)
                            .Analyzer("standard")
                        )
                        .Text(t => t
                            .Name(n => n.ShortDescription)
                            .Analyzer("standard")
                        )
                        .Keyword(k => k.Name(n => n.SKU))
                        .Number(n => n
                            .Name(p => p.BasePrice)
                            .Type(NumberType.Double)
                        )
                        .Completion(co => co
                            .Name("suggest")
                            .Contexts(ctx => ctx
                                .Category(c => c.Name("category"))
                            )
                        )
                    )
                )
            );
        }
    }

    public async Task IndexProductAsync(Product product, CancellationToken cancellationToken = default)
    {
        // Create a flattened document for Elasticsearch
        var document = new
        {
            product.Id,
            product.Name,
            product.Description,
            product.BasePrice,
            BrandName = product.Brand?.Name,
            product.IsActive,
            product.IsFeatured
        };
        
        var response = await _client.IndexAsync(document, idx => idx.Index(ProductIndexName).Id(product.Id));
        if (!response.IsValid)
        {
            throw new InvalidOperationException($"Failed to index product: {response.DebugInformation}");
        }
    }

    public async Task IndexProductsAsync(IEnumerable<Product> products, CancellationToken cancellationToken = default)
    {
        var documents = products.Select(p => new
        {
            p.Id,
            p.Name,
            p.Description,
            p.BasePrice,
            BrandName = p.Brand?.Name,
            p.IsActive,
            p.IsFeatured
        });
        
        var response = await _client.IndexManyAsync(documents, ProductIndexName);
        if (!response.IsValid)
        {
            throw new InvalidOperationException($"Failed to index products: {response.DebugInformation}");
        }
    }

    public async Task UpdateProductAsync(Product product, CancellationToken cancellationToken = default)
    {
        var document = new
        {
            product.Id,
            product.Name,
            product.Description,
            product.BasePrice,
            BrandName = product.Brand?.Name,
            product.IsActive,
            product.IsFeatured
        };
        
        var response = await _client.UpdateAsync<object, object>(product.Id, u => u
            .Index(ProductIndexName)
            .Doc(document)
            .DocAsUpsert(true)
        );
        
        if (!response.IsValid)
        {
            throw new InvalidOperationException($"Failed to update product: {response.DebugInformation}");
        }
    }

    public async Task DeleteProductAsync(Guid productId, CancellationToken cancellationToken = default)
    {
        var response = await _client.DeleteAsync<Product>(productId);
        if (!response.IsValid && response.Result != Result.NotFound)
        {
            throw new InvalidOperationException($"Failed to delete product: {response.DebugInformation}");
        }
    }

    public async Task<SearchResult<Product>> SearchAsync(string query, int pageNumber, int pageSize, CancellationToken cancellationToken = default)
    {
        var searchResponse = await _client.SearchAsync<Product>(s => s
            .From((pageNumber - 1) * pageSize)
            .Size(pageSize)
            .Query(q => q
                .MultiMatch(mm => mm
                    .Query(query)
                    .Fields(f => f
                        .Field(p => p.Name, boost: 2.0)
                        .Field(p => p.Description)
                        .Field(p => p.ShortDescription)
                        .Field(p => p.SKU)
                    )
                    .Type(TextQueryType.BestFields)
                    .Fuzziness(Fuzziness.Auto)
                )
            )
        );

        if (!searchResponse.IsValid)
        {
            throw new InvalidOperationException($"Search failed: {searchResponse.DebugInformation}");
        }

        return new SearchResult<Product>
        {
            Items = searchResponse.Documents.ToList(),
            TotalCount = searchResponse.Total,
            PageNumber = pageNumber,
            PageSize = pageSize
        };
    }

    public async Task<IEnumerable<string>> AutocompleteAsync(string query, int limit, CancellationToken cancellationToken = default)
    {
        var searchResponse = await _client.SearchAsync<Product>(s => s
            .Size(limit)
            .Query(q => q
                .MultiMatch(mm => mm
                    .Query(query)
                    .Fields(f => f
                        .Field(p => p.Name)
                    )
                    .Type(TextQueryType.PhrasePrefix)
                )
            )
        );

        if (!searchResponse.IsValid)
        {
            throw new InvalidOperationException($"Autocomplete failed: {searchResponse.DebugInformation}");
        }

        return searchResponse.Documents.Select(d => d.Name).Distinct();
    }

    public async Task<SearchResult<Product>> FacetedSearchAsync(
        string query,
        List<Guid>? categoryIds = null,
        List<Guid>? brandIds = null,
        decimal? minPrice = null,
        decimal? maxPrice = null,
        int pageNumber = 1,
        int pageSize = 20,
        CancellationToken cancellationToken = default)
    {
        var searchResponse = await _client.SearchAsync<Product>(s =>
        {
            var descriptor = s
                .From((pageNumber - 1) * pageSize)
                .Size(pageSize)
                .Query(q =>
                {
                    var queries = new List<Func<QueryContainerDescriptor<Product>, QueryContainer>>();

                    // Text search
                    if (!string.IsNullOrWhiteSpace(query))
                    {
                        queries.Add(mq => mq
                            .MultiMatch(mm => mm
                                .Query(query)
                                .Fields(f => f
                                    .Field(p => p.Name, boost: 2.0)
                                    .Field(p => p.Description)
                                    .Field(p => p.ShortDescription)
                                )
                                .Fuzziness(Fuzziness.Auto)
                            )
                        );
                    }

                    // Category filter
                    if (categoryIds != null && categoryIds.Any())
                    {
                        queries.Add(mq => mq
                            .Terms(t => t
                                .Field(f => f.CategoryId)
                                .Terms(categoryIds)
                            )
                        );
                    }

                    // Brand filter
                    if (brandIds != null && brandIds.Any())
                    {
                        queries.Add(mq => mq
                            .Terms(t => t
                                .Field(f => f.BrandId)
                                .Terms(brandIds)
                            )
                        );
                    }

                    // Price range filter
                    if (minPrice.HasValue || maxPrice.HasValue)
                    {
                        queries.Add(mq => mq
                            .Range(r =>
                            {
                                var range = r.Field(f => f.BasePrice);
                                if (minPrice.HasValue)
                                    range = range.GreaterThanOrEquals((double)minPrice.Value);
                                if (maxPrice.HasValue)
                                    range = range.LessThanOrEquals((double)maxPrice.Value);
                                return range;
                            })
                        );
                    }

                    // Combine all queries with Bool.Must
                    return q.Bool(b => b.Must(queries.ToArray()));
                })
                .Aggregations(a => a
                    .Terms("categories", t => t
                        .Field(f => f.CategoryId)
                        .Size(50)
                    )
                    .Terms("brands", t => t
                        .Field(f => f.BrandId)
                        .Size(50)
                    )
                );

            return descriptor;
        });

        if (!searchResponse.IsValid)
        {
            throw new InvalidOperationException($"Faceted search failed: {searchResponse.DebugInformation}");
        }

        var result = new SearchResult<Product>
        {
            Items = searchResponse.Documents.ToList(),
            TotalCount = searchResponse.Total,
            PageNumber = pageNumber,
            PageSize = pageSize
        };

        // Extract facets
        if (searchResponse.Aggregations.Terms("categories") is { } categoryAgg)
        {
            result.Facets["categories"] = categoryAgg.Buckets
                .Select(b => new FacetItem { Key = b.Key, Count = b.DocCount ?? 0 })
                .ToList();
        }

        if (searchResponse.Aggregations.Terms("brands") is { } brandAgg)
        {
            result.Facets["brands"] = brandAgg.Buckets
                .Select(b => new FacetItem { Key = b.Key, Count = b.DocCount ?? 0 })
                .ToList();
        }

        return result;
    }
}
