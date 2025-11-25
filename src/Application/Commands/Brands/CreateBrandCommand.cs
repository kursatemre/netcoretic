using Application.Interfaces;
using Application.DTOs;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace Application.Commands.Brands;

public class CreateBrandCommand : IRequest<BrandDto>
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
}

public class CreateBrandCommandHandler : IRequestHandler<CreateBrandCommand, BrandDto>
{
    private readonly IApplicationDbContext _context;

    public CreateBrandCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<BrandDto> Handle(CreateBrandCommand request, CancellationToken cancellationToken)
    {
        var brand = new Brand
        {
            Name = request.Name,
            Description = request.Description
        };

        _context.Brands.Add(brand);
        await _context.SaveChangesAsync(cancellationToken);

        return new BrandDto
        {
            Id = brand.Id,
            Name = brand.Name,
            Description = brand.Description,
            ProductCount = 0,
            CreatedAt = brand.CreatedAt
        };
    }
}
