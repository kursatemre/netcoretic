using Application.DTOs;
using MediatR;

namespace Application.Queries.Categories;

public class GetCategoryByIdQuery : IRequest<CategoryDto>
{
    public Guid Id { get; set; }
}
