using Application.Commands.Brands;
using Application.DTOs;
using Application.Queries.Brands;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Admin;

[ApiController]
[Route("api/admin/[controller]")]
[Authorize(Roles = "Admin")]
public class AdminBrandsController : ControllerBase
{
    private readonly IMediator _mediator;

    public AdminBrandsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Admin: Get all brands
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(List<BrandDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<List<BrandDto>>> GetAll()
    {
        var query = new GetAllBrandsQuery();
        var result = await _mediator.Send(query);
        return Ok(result);
    }

    /// <summary>
    /// Admin: Get brand by ID
    /// </summary>
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(BrandDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<BrandDto>> GetById(Guid id)
    {
        var query = new GetBrandByIdQuery { Id = id };
        var result = await _mediator.Send(query);
        return Ok(result);
    }

    /// <summary>
    /// Admin: Create new brand
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(BrandDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<BrandDto>> Create([FromBody] CreateBrandCommand command)
    {
        var result = await _mediator.Send(command);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    /// <summary>
    /// Admin: Update brand
    /// </summary>
    [HttpPut("{id}")]
    [ProducesResponseType(typeof(BrandDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<BrandDto>> Update(Guid id, [FromBody] UpdateBrandCommand command)
    {
        if (id != command.Id)
        {
            return BadRequest("ID mismatch");
        }

        var result = await _mediator.Send(command);
        return Ok(result);
    }

    /// <summary>
    /// Admin: Delete brand
    /// </summary>
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Delete(Guid id)
    {
        var command = new DeleteBrandCommand { Id = id };
        await _mediator.Send(command);
        return NoContent();
    }

    /// <summary>
    /// Admin: Get brand statistics
    /// </summary>
    [HttpGet("statistics")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    public async Task<ActionResult> GetStatistics()
    {
        var brands = await _mediator.Send(new GetAllBrandsQuery());

        var stats = new
        {
            TotalBrands = brands.Count,
            BrandsWithProducts = brands.Count(b => b.ProductCount > 0),
            EmptyBrands = brands.Count(b => b.ProductCount == 0),
            TotalProducts = brands.Sum(b => b.ProductCount),
            TopBrand = brands.OrderByDescending(b => b.ProductCount).FirstOrDefault()
        };

        return Ok(stats);
    }
}
