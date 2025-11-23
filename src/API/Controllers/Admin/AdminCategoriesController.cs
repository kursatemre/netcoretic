using Application.Commands.Categories;
using Application.DTOs;
using Application.Queries.Categories;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Admin;

[ApiController]
[Route("api/admin/[controller]")]
[Authorize(Roles = "Admin")]
public class AdminCategoriesController : ControllerBase
{
    private readonly IMediator _mediator;

    public AdminCategoriesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Admin: Get all categories
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(List<CategoryDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<List<CategoryDto>>> GetAll()
    {
        var query = new GetAllCategoriesQuery();
        var result = await _mediator.Send(query);
        return Ok(result);
    }

    /// <summary>
    /// Admin: Get category by ID
    /// </summary>
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(CategoryDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<CategoryDto>> GetById(Guid id)
    {
        var query = new GetCategoryByIdQuery { Id = id };
        var result = await _mediator.Send(query);
        return Ok(result);
    }

    /// <summary>
    /// Admin: Create new category
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(CategoryDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<CategoryDto>> Create([FromBody] CreateCategoryCommand command)
    {
        var result = await _mediator.Send(command);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    /// <summary>
    /// Admin: Update category
    /// </summary>
    [HttpPut("{id}")]
    [ProducesResponseType(typeof(CategoryDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<CategoryDto>> Update(Guid id, [FromBody] UpdateCategoryCommand command)
    {
        if (id != command.Id)
        {
            return BadRequest("ID mismatch");
        }

        var result = await _mediator.Send(command);
        return Ok(result);
    }

    /// <summary>
    /// Admin: Delete category
    /// </summary>
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Delete(Guid id)
    {
        var command = new DeleteCategoryCommand { Id = id };
        await _mediator.Send(command);
        return NoContent();
    }

    /// <summary>
    /// Admin: Get category statistics
    /// </summary>
    [HttpGet("statistics")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    public async Task<ActionResult> GetStatistics()
    {
        var categories = await _mediator.Send(new GetAllCategoriesQuery());

        var stats = new
        {
            TotalCategories = categories.Count,
            CategoriesWithProducts = categories.Count(c => c.ProductCount > 0),
            EmptyCategories = categories.Count(c => c.ProductCount == 0),
            TotalProducts = categories.Sum(c => c.ProductCount),
            TopCategory = categories.OrderByDescending(c => c.ProductCount).FirstOrDefault()
        };

        return Ok(stats);
    }
}
