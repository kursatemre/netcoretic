using Application.DTOs;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Queries.Brands;

public class GetBrandByIdQueryHandler : IRequestHandler<GetBrandByIdQuery, BrandDto>
{
    private readonly IApplicationDbContext _context;

    public GetBrandByIdQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<BrandDto> Handle(GetBrandByIdQuery request, CancellationToken cancellationToken)
    {
        var brand = await _context.Brands
            .Include(b => b.Products)
            .FirstOrDefaultAsync(b => b.Id == request.Id, cancellationToken);

        if (brand == null)
        {
            throw new Exception($"Brand with ID {request.Id} not found");
        }

        return new BrandDto
        {
            Id = brand.Id,
            Name = brand.Name,
            Description = brand.Description,
            ProductCount = brand.Products.Count,
            CreatedAt = brand.CreatedAt
        };
    }
}
