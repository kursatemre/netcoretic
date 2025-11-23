namespace Domain.Entities;

/// <summary>
/// Kategori entity'si - Hiyerarşik yapı desteği
/// </summary>
public class Category : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? ImageUrl { get; set; }
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; }
    
    // Hiyerarşi
    public Guid? ParentCategoryId { get; set; }
    public Category? ParentCategory { get; set; }
    public ICollection<Category> SubCategories { get; set; } = new List<Category>();
    
    // SEO
    public string? MetaTitle { get; set; }
    public string? MetaDescription { get; set; }
    public string? MetaKeywords { get; set; }
    
    // İlişkiler
    public ICollection<Product> Products { get; set; } = new List<Product>();
    public ICollection<ProductCategory> ProductCategories { get; set; } = new List<ProductCategory>();
    
    // Kategoriye özel filtreleme özellikleri
    public ICollection<CategoryAttribute> CategoryAttributes { get; set; } = new List<CategoryAttribute>();
}
