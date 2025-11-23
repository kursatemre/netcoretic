using Application.DTOs;
using MediatR;

namespace Application.Queries.Brands;

public class GetBrandByIdQuery : IRequest<BrandDto>
{
    public Guid Id { get; set; }
}
