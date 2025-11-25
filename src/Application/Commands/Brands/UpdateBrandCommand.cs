using Application.Interfaces;
using Application.DTOs;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Commands.Brands;

public class UpdateBrandCommand : IRequest<BrandDto>
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
}

public class UpdateBrandCommandHandler : IRequestHandler<UpdateBrandCommand, BrandDto>
{
    private readonly IApplicationDbContext _context;

    public UpdateBrandCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<BrandDto> Handle(UpdateBrandCommand request, CancellationToken cancellationToken)
    {
        var brand = await _context.Brands
            .Include(b => b.Products)
            .FirstOrDefaultAsync(b => b.Id == request.Id, cancellationToken);

        if (brand == null)
        {
            throw new Exception($"Brand with ID {request.Id} not found");
        }

        brand.Name = request.Name;
        brand.Description = request.Description;

        await _context.SaveChangesAsync(cancellationToken);

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
