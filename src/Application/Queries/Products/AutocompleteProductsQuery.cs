using Application.Interfaces;
using MediatR;

namespace Application.Queries.Products;

public class AutocompleteProductsQuery : IRequest<IEnumerable<string>>
{
    public string Query { get; set; } = string.Empty;
    public int Limit { get; set; } = 10;
}

public class AutocompleteProductsQueryHandler : IRequestHandler<AutocompleteProductsQuery, IEnumerable<string>>
{
    private readonly IProductSearchService _searchService;

    public AutocompleteProductsQueryHandler(IProductSearchService searchService)
    {
        _searchService = searchService;
    }

    public async Task<IEnumerable<string>> Handle(AutocompleteProductsQuery request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Query))
        {
            return Enumerable.Empty<string>();
        }

        return await _searchService.AutocompleteAsync(request.Query, request.Limit, cancellationToken);
    }
}
