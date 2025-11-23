using MediatR;

namespace Application.Commands.Products;

public class DeleteProductCommand : IRequest<bool>
{
    public Guid Id { get; set; }

    public DeleteProductCommand(Guid id)
    {
        Id = id;
    }
}
