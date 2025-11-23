using Application.Commands.ProductVariations;
using Application.DTOs;
using Application.Queries.ProductVariations;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/Products/{productId}/[controller]")]
public class VariationsController : ControllerBase
{
    private readonly IMediator _mediator;

    public VariationsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Ürünün tüm varyasyonlarını getir
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(List<ProductVariationDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<List<ProductVariationDto>>> GetVariations(Guid productId)
    {
        var variations = await _mediator.Send(new GetProductVariationsQuery(productId));
        return Ok(variations);
    }

    /// <summary>
    /// Ürüne yeni varyasyon ekle
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(ProductVariationDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ProductVariationDto>> CreateVariation(
        Guid productId,
        [FromBody] CreateProductVariationCommand command)
    {
        command.ProductId = productId;

        try
        {
            var variation = await _mediator.Send(command);
            return CreatedAtAction(
                nameof(GetVariations),
                new { productId },
                variation);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
    }
}
