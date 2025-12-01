namespace Domain.Entities;

public class StoreSettings
{
    public Guid Id { get; set; }
    public string SiteName { get; set; } = "NetCoretic";
    public string? Logo { get; set; }
    public string ThemeColor { get; set; } = "#F7A072";
    public string? HeroSlidesJson { get; set; }
    public string? SectionsJson { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
}
