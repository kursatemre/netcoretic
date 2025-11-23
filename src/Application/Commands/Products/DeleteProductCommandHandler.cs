using Application.Interfaces;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace Application.Commands.Products;

public class DeleteProductCommandHandler : IRequestHandler<DeleteProductCommand, bool>
{
    private readonly IRepository<Product> _productRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IProductSearchService _searchService;

    public DeleteProductCommandHandler(
        IRepository<Product> productRepository,
        IUnitOfWork unitOfWork,
        IProductSearchService searchService)
    {
        _productRepository = productRepository;
        _unitOfWork = unitOfWork;
        _searchService = searchService;
    }

    public async Task<bool> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
    {
        var product = await _productRepository.GetByIdAsync(request.Id, cancellationToken);
        if (product == null)
            return false;

        // Soft delete
        product.IsDeleted = true;
        product.UpdatedAt = DateTime.UtcNow;
        
        await _productRepository.UpdateAsync(product, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        // Delete product from Elasticsearch
        try
        {
            await _searchService.DeleteProductAsync(product.Id, cancellationToken);
        }
        catch (Exception ex)
        {
            // Log error but don't fail the operation
            Console.WriteLine($"Failed to delete product from Elasticsearch: {ex.Message}");
        }

        return true;
    }
}
