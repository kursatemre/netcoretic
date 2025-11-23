using Application.DTOs;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Queries.Brands;

public class GetAllBrandsQueryHandler : IRequestHandler<GetAllBrandsQuery, List<BrandDto>>
{
    private readonly IApplicationDbContext _context;

    public GetAllBrandsQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<BrandDto>> Handle(GetAllBrandsQuery request, CancellationToken cancellationToken)
    {
        var brands = await _context.Brands
            .Include(b => b.Products)
            .OrderBy(b => b.Name)
            .ToListAsync(cancellationToken);

        return brands.Select(b => new BrandDto
        {
            Id = b.Id,
            Name = b.Name,
            Description = b.Description,
            ProductCount = b.Products.Count,
            CreatedAt = b.CreatedAt
        }).ToList();
    }
}
