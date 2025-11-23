using Application.DTOs;
using MediatR;

namespace Application.Queries.Products;

/// <summary>
/// Ürün detayı sorgulama
/// </summary>
public record GetProductByIdQuery(Guid ProductId) : IRequest<ProductDto?>;
