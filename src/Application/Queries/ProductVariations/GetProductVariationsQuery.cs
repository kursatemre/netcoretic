using Application.DTOs;
using MediatR;

namespace Application.Queries.ProductVariations;

public class GetProductVariationsQuery : IRequest<List<ProductVariationDto>>
{
    public Guid ProductId { get; set; }

    public GetProductVariationsQuery(Guid productId)
    {
        ProductId = productId;
    }
}
