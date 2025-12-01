using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Infrastructure.Data;
using System.Text.Json;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StoreSettingsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public StoreSettingsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetSettings()
    {
        var settings = await _context.StoreSettings.FirstOrDefaultAsync();
        
        if (settings == null)
        {
            // Return default settings
            return Ok(new
            {
                siteName = "NetCoretic",
                logo = "",
                themeColor = "#F7A072",
                heroSlides = new List<object>(),
                sections = new List<object>()
            });
        }

        return Ok(new
        {
            settings.SiteName,
            settings.Logo,
            settings.ThemeColor,
            HeroSlides = string.IsNullOrEmpty(settings.HeroSlidesJson) 
                ? new List<object>() 
                : JsonSerializer.Deserialize<List<object>>(settings.HeroSlidesJson),
            Sections = string.IsNullOrEmpty(settings.SectionsJson) 
                ? new List<object>() 
                : JsonSerializer.Deserialize<List<object>>(settings.SectionsJson)
        });
    }

    [HttpPut]
    public async Task<IActionResult> UpdateSettings([FromBody] StoreSettingsUpdateDto dto)
    {
        var settings = await _context.StoreSettings.FirstOrDefaultAsync();

        if (settings == null)
        {
            settings = new Domain.Entities.StoreSettings
            {
                Id = Guid.NewGuid(),
                CreatedAt = DateTime.UtcNow
            };
            _context.StoreSettings.Add(settings);
        }

        settings.SiteName = dto.SiteName ?? settings.SiteName;
        settings.Logo = dto.Logo ?? settings.Logo;
        settings.ThemeColor = dto.ThemeColor ?? settings.ThemeColor;
        settings.UpdatedAt = DateTime.UtcNow;

        if (dto.HeroSlides != null)
        {
            settings.HeroSlidesJson = JsonSerializer.Serialize(dto.HeroSlides);
        }

        if (dto.Sections != null)
        {
            settings.SectionsJson = JsonSerializer.Serialize(dto.Sections);
        }

        await _context.SaveChangesAsync();

        return Ok(new { message = "Ayarlar başarıyla güncellendi" });
    }

    [HttpPut("general")]
    public async Task<IActionResult> UpdateGeneralSettings([FromBody] GeneralSettingsDto dto)
    {
        var settings = await _context.StoreSettings.FirstOrDefaultAsync();

        if (settings == null)
        {
            settings = new Domain.Entities.StoreSettings
            {
                Id = Guid.NewGuid(),
                CreatedAt = DateTime.UtcNow
            };
            _context.StoreSettings.Add(settings);
        }

        settings.SiteName = dto.SiteName ?? settings.SiteName;
        settings.Logo = dto.Logo ?? settings.Logo;
        settings.ThemeColor = dto.ThemeColor ?? settings.ThemeColor;
        settings.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Genel ayarlar güncellendi" });
    }

    [HttpPut("hero-slides")]
    public async Task<IActionResult> UpdateHeroSlides([FromBody] List<HeroSlideDto> slides)
    {
        var settings = await _context.StoreSettings.FirstOrDefaultAsync();

        if (settings == null)
        {
            settings = new Domain.Entities.StoreSettings
            {
                Id = Guid.NewGuid(),
                CreatedAt = DateTime.UtcNow
            };
            _context.StoreSettings.Add(settings);
        }

        settings.HeroSlidesJson = JsonSerializer.Serialize(slides);
        settings.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Hero slaytları güncellendi" });
    }

    [HttpPut("sections")]
    public async Task<IActionResult> UpdateSections([FromBody] List<SectionDto> sections)
    {
        var settings = await _context.StoreSettings.FirstOrDefaultAsync();

        if (settings == null)
        {
            settings = new Domain.Entities.StoreSettings
            {
                Id = Guid.NewGuid(),
                CreatedAt = DateTime.UtcNow
            };
            _context.StoreSettings.Add(settings);
        }

        settings.SectionsJson = JsonSerializer.Serialize(sections);
        settings.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Bölümler güncellendi" });
    }
}

public class StoreSettingsUpdateDto
{
    public string? SiteName { get; set; }
    public string? Logo { get; set; }
    public string? ThemeColor { get; set; }
    public List<HeroSlideDto>? HeroSlides { get; set; }
    public List<SectionDto>? Sections { get; set; }
}

public class GeneralSettingsDto
{
    public string? SiteName { get; set; }
    public string? Logo { get; set; }
    public string? ThemeColor { get; set; }
}

public class HeroSlideDto
{
    public string Id { get; set; } = "";
    public string Title { get; set; } = "";
    public string Subtitle { get; set; } = "";
    public string Image { get; set; } = "";
    public string Cta { get; set; } = "";
    public string Link { get; set; } = "";
    public bool Enabled { get; set; } = true;
}

public class SectionDto
{
    public string Id { get; set; } = "";
    public string Type { get; set; } = "";
    public string Name { get; set; } = "";
    public bool Enabled { get; set; } = true;
    public int Order { get; set; }
    public SectionContentDto? Content { get; set; }
}

public class SectionContentDto
{
    public string? Title { get; set; }
    public string? Subtitle { get; set; }
    public string? Description { get; set; }
    public string? BackgroundColor { get; set; }
    public string? TextColor { get; set; }
    public string? ButtonText { get; set; }
    public string? ButtonColor { get; set; }
    public string? Image { get; set; }
    public List<string>? Images { get; set; }
}
