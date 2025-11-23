namespace Domain.Entities;

/// <summary>
/// Marka entity'si
/// </summary>
public class Brand : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? LogoUrl { get; set; }
    public string? WebsiteUrl { get; set; }
    public bool IsActive { get; set; }
    public int DisplayOrder { get; set; }
    
    // SEO
    public string? MetaTitle { get; set; }
    public string? MetaDescription { get; set; }
    
    // İlişkiler
    public ICollection<Product> Products { get; set; } = new List<Product>();
}
