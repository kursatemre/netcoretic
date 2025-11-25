using Application.Commands.Products;
using Application.DTOs;
using Application.Queries.Products;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Admin;

[ApiController]
[Route("api/admin/[controller]")]
[Authorize(Roles = "Admin")]
public class AdminProductsController : ControllerBase
{
    private readonly IMediator _mediator;

    public AdminProductsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Admin: Get all products with admin filters
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(PagedResult<ProductDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<PagedResult<ProductDto>>> GetAll(
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20,
        [FromQuery] string? searchTerm = null,
        [FromQuery] Guid? categoryId = null,
        [FromQuery] Guid? brandId = null,
        [FromQuery] bool? isActive = null,
        [FromQuery] bool? isFeatured = null,
        [FromQuery] string? sortBy = "CreatedAt",
        [FromQuery] bool sortDescending = true)
    {
        var query = new GetAllProductsQuery
        {
            PageNumber = pageNumber,
            PageSize = pageSize,
            SearchTerm = searchTerm,
            CategoryId = categoryId,
            BrandId = brandId,
            IsActive = isActive,
            IsFeatured = isFeatured,
            SortBy = sortBy,
            SortDescending = sortDescending
        };

        var result = await _mediator.Send(query);
        return Ok(result);
    }

    /// <summary>
    /// Admin: Get product by ID (including inactive)
    /// </summary>
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(ProductDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ProductDto>> GetById(Guid id)
    {
        var result = await _mediator.Send(new GetProductByIdQuery(id));
        return Ok(result);
    }

    /// <summary>
    /// Admin: Create new product
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(ProductDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ProductDto>> Create([FromBody] CreateProductCommand command)
    {
        var result = await _mediator.Send(command);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    /// <summary>
    /// Admin: Update existing product
    /// </summary>
    [HttpPut("{id}")]
    [ProducesResponseType(typeof(ProductDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ProductDto>> Update(Guid id, [FromBody] UpdateProductCommand command)
    {
        if (id != command.Id)
        {
            return BadRequest("ID mismatch");
        }

        var result = await _mediator.Send(command);
        return Ok(result);
    }

    /// <summary>
    /// Admin: Delete product (soft delete)
    /// </summary>
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _mediator.Send(new DeleteProductCommand(id));
        return NoContent();
    }

    /// <summary>
    /// Admin: Toggle product active status
    /// </summary>
    [HttpPatch("{id}/toggle-active")]
    [ProducesResponseType(typeof(ProductDto), StatusCodes.Status200OK)]
    public async Task<ActionResult<ProductDto>> ToggleActive(Guid id)
    {
        var product = await _mediator.Send(new GetProductByIdQuery(id));
        var command = new UpdateProductCommand
        {
            Id = id,
            Name = product.Name,
            Description = product.Description,
            BasePrice = product.BasePrice,
            CategoryId = product.Category.Id,
            BrandId = product.Brand.Id,
            IsActive = !product.IsActive,
            IsFeatured = product.IsFeatured
        };

        var result = await _mediator.Send(command);
        return Ok(result);
    }

    /// <summary>
    /// Admin: Toggle product featured status
    /// </summary>
    [HttpPatch("{id}/toggle-featured")]
    [ProducesResponseType(typeof(ProductDto), StatusCodes.Status200OK)]
    public async Task<ActionResult<ProductDto>> ToggleFeatured(Guid id)
    {
        var product = await _mediator.Send(new GetProductByIdQuery(id));
        var command = new UpdateProductCommand
        {
            Id = id,
            Name = product.Name,
            Description = product.Description,
            BasePrice = product.BasePrice,
            CategoryId = product.Category.Id,
            BrandId = product.Brand.Id,
            IsActive = product.IsActive,
            IsFeatured = !product.IsFeatured
        };

        var result = await _mediator.Send(command);
        return Ok(result);
    }

    /// <summary>
    /// Admin: Get product statistics
    /// </summary>
    [HttpGet("statistics")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    public async Task<ActionResult> GetStatistics()
    {
        var allProducts = await _mediator.Send(new GetAllProductsQuery
        {
            PageNumber = 1,
            PageSize = 1000 // Get all for stats
        });

        var stats = new
        {
            TotalProducts = allProducts.TotalCount,
            ActiveProducts = allProducts.Items.Count(p => p.IsActive),
            InactiveProducts = allProducts.Items.Count(p => !p.IsActive),
            FeaturedProducts = allProducts.Items.Count(p => p.IsFeatured),
            AveragePrice = allProducts.Items.Any() ? allProducts.Items.Average(p => p.BasePrice) : 0,
            TotalValue = allProducts.Items.Sum(p => p.BasePrice),
            LowStockProducts = allProducts.Items.Count(p => p.StockQuantity < 10)
        };

        return Ok(stats);
    }
}
