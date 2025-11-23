using Application.Commands.Products;
using Application.DTOs;
using Application.Interfaces;
using Application.Queries.Products;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IMediator _mediator;

    public ProductsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Tüm ürünleri getir (Pagination, Filtering, Sorting)
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(PagedResult<ProductDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<PagedResult<ProductDto>>> GetAll(
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? searchTerm = null,
        [FromQuery] Guid? categoryId = null,
        [FromQuery] Guid? brandId = null,
        [FromQuery] decimal? minPrice = null,
        [FromQuery] decimal? maxPrice = null,
        [FromQuery] string? sortBy = "CreatedAt",
        [FromQuery] bool sortDescending = true,
        [FromQuery] bool? isActive = null,
        [FromQuery] bool? isFeatured = null)
    {
        var query = new GetAllProductsQuery
        {
            PageNumber = pageNumber,
            PageSize = pageSize,
            SearchTerm = searchTerm,
            CategoryId = categoryId,
            BrandId = brandId,
            MinPrice = minPrice,
            MaxPrice = maxPrice,
            SortBy = sortBy,
            SortDescending = sortDescending,
            IsActive = isActive,
            IsFeatured = isFeatured
        };

        var result = await _mediator.Send(query);
        return Ok(result);
    }

    /// <summary>
    /// Ürün detayı getir
    /// </summary>
    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(ProductDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ProductDto>> GetById(Guid id)
    {
        var product = await _mediator.Send(new GetProductByIdQuery(id));
        
        if (product == null)
            return NotFound();
        
        return Ok(product);
    }

    /// <summary>
    /// Yeni ürün oluştur
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(ProductDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ProductDto>> Create([FromBody] CreateProductCommand command)
    {
        var product = await _mediator.Send(command);
        return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
    }

    /// <summary>
    /// Ürün güncelle
    /// </summary>
    [HttpPut("{id:guid}")]
    [ProducesResponseType(typeof(ProductDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ProductDto>> Update(Guid id, [FromBody] UpdateProductCommand command)
    {
        if (id != command.Id)
            return BadRequest("ID mismatch");

        try
        {
            var product = await _mediator.Send(command);
            return Ok(product);
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }

    /// <summary>
    /// Ürün sil (Soft Delete)
    /// </summary>
    [HttpDelete("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await _mediator.Send(new DeleteProductCommand(id));
        
        if (!result)
            return NotFound();
        
        return NoContent();
    }

    /// <summary>
    /// Ürünlerde tam metin araması yap
    /// </summary>
    [HttpGet("search")]
    [ProducesResponseType(typeof(SearchResult<Domain.Entities.Product>), StatusCodes.Status200OK)]
    public async Task<ActionResult<SearchResult<Domain.Entities.Product>>> Search(
        [FromQuery] string query,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var searchQuery = new SearchProductsQuery
        {
            Query = query,
            PageNumber = pageNumber,
            PageSize = pageSize
        };

        var result = await _mediator.Send(searchQuery);
        return Ok(result);
    }

    /// <summary>
    /// Ürün adı otomatik tamamlama
    /// </summary>
    [HttpGet("autocomplete")]
    [ProducesResponseType(typeof(IEnumerable<string>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<string>>> Autocomplete(
        [FromQuery] string query,
        [FromQuery] int limit = 10)
    {
        var autocompleteQuery = new AutocompleteProductsQuery
        {
            Query = query,
            Limit = limit
        };

        var result = await _mediator.Send(autocompleteQuery);
        return Ok(result);
    }

    /// <summary>
    /// Gelişmiş arama (full-text + filtreler + facetler)
    /// </summary>
    [HttpGet("faceted-search")]
    [ProducesResponseType(typeof(SearchResult<Domain.Entities.Product>), StatusCodes.Status200OK)]
    public async Task<ActionResult<SearchResult<Domain.Entities.Product>>> FacetedSearch(
        [FromQuery] string? query = null,
        [FromQuery] List<Guid>? categoryIds = null,
        [FromQuery] List<Guid>? brandIds = null,
        [FromQuery] decimal? minPrice = null,
        [FromQuery] decimal? maxPrice = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var searchQuery = new FacetedSearchProductsQuery
        {
            Query = query ?? string.Empty,
            CategoryIds = categoryIds,
            BrandIds = brandIds,
            MinPrice = minPrice,
            MaxPrice = maxPrice,
            PageNumber = pageNumber,
            PageSize = pageSize
        };

        var result = await _mediator.Send(searchQuery);
        return Ok(result);
    }
}
