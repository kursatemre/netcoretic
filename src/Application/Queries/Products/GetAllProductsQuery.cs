using Application.DTOs;
using MediatR;

namespace Application.Queries.Products;

public class GetAllProductsQuery : IRequest<PagedResult<ProductDto>>
{
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 10;
    public string? SearchTerm { get; set; }
    public Guid? CategoryId { get; set; }
    public Guid? BrandId { get; set; }
    public decimal? MinPrice { get; set; }
    public decimal? MaxPrice { get; set; }
    public string? SortBy { get; set; } = "CreatedAt";
    public bool SortDescending { get; set; } = true;
    public bool? IsActive { get; set; }
    public bool? IsFeatured { get; set; }
}
