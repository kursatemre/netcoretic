using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Commands.Brands;

public class DeleteBrandCommand : IRequest
{
    public Guid Id { get; set; }
}

public class DeleteBrandCommandHandler : IRequestHandler<DeleteBrandCommand>
{
    private readonly IApplicationDbContext _context;

    public DeleteBrandCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(DeleteBrandCommand request, CancellationToken cancellationToken)
    {
        var brand = await _context.Brands
            .Include(b => b.Products)
            .FirstOrDefaultAsync(b => b.Id == request.Id, cancellationToken);

        if (brand == null)
        {
            throw new Exception($"Brand with ID {request.Id} not found");
        }

        if (brand.Products.Any())
        {
            throw new Exception("Cannot delete brand with existing products");
        }

        _context.Brands.Remove(brand);
        await _context.SaveChangesAsync(cancellationToken);
    }
}
