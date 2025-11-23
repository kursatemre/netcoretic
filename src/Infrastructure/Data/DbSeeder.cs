using Domain.Entities;

namespace Infrastructure.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(ApplicationDbContext context)
    {
        // Check if data already exists
        if (context.Categories.Any() || context.Brands.Any() || context.ProductAttributes.Any())
            return;

        // Seed Categories
        var categories = new List<Category>
        {
            new Category
            {
                Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                Name = "Elektronik",
                Slug = "elektronik",
                Description = "Elektronik ürünler",
                DisplayOrder = 1,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            },
            new Category
            {
                Id = Guid.Parse("22222222-2222-2222-2222-222222222222"),
                Name = "Giyim",
                Slug = "giyim",
                Description = "Giyim ürünleri",
                DisplayOrder = 2,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            },
            new Category
            {
                Id = Guid.Parse("33333333-3333-3333-3333-333333333333"),
                Name = "Mobilya",
                Slug = "mobilya",
                Description = "Ev mobilyaları",
                DisplayOrder = 3,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            }
        };

        // Seed Brands
        var brands = new List<Brand>
        {
            new Brand
            {
                Id = Guid.Parse("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"),
                Name = "Samsung",
                Slug = "samsung",
                Description = "Samsung Electronics",
                IsActive = true,
                DisplayOrder = 1,
                CreatedAt = DateTime.UtcNow
            },
            new Brand
            {
                Id = Guid.Parse("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"),
                Name = "Nike",
                Slug = "nike",
                Description = "Nike Sports",
                IsActive = true,
                DisplayOrder = 2,
                CreatedAt = DateTime.UtcNow
            },
            new Brand
            {
                Id = Guid.Parse("cccccccc-cccc-cccc-cccc-cccccccccccc"),
                Name = "IKEA",
                Slug = "ikea",
                Description = "IKEA Furniture",
                IsActive = true,
                DisplayOrder = 3,
                CreatedAt = DateTime.UtcNow
            }
        };

        // Seed Product Attributes (Renk, Beden, Hafıza)
        var colorAttribute = new ProductAttribute
        {
            Id = Guid.Parse("11111111-aaaa-aaaa-aaaa-111111111111"),
            Name = "Renk",
            Slug = "renk",
            Description = "Ürün rengi",
            DisplayOrder = 1,
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        var sizeAttribute = new ProductAttribute
        {
            Id = Guid.Parse("22222222-aaaa-aaaa-aaaa-222222222222"),
            Name = "Beden",
            Slug = "beden",
            Description = "Ürün bedeni",
            DisplayOrder = 2,
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        var storageAttribute = new ProductAttribute
        {
            Id = Guid.Parse("33333333-aaaa-aaaa-aaaa-333333333333"),
            Name = "Hafıza",
            Slug = "hafiza",
            Description = "Cihaz hafızası",
            DisplayOrder = 3,
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        await context.ProductAttributes.AddRangeAsync(new[] { colorAttribute, sizeAttribute, storageAttribute });
        await context.SaveChangesAsync();

        // Seed Attribute Values
        var colorValues = new List<ProductAttributeValue>
        {
            new ProductAttributeValue
            {
                Id = Guid.Parse("11111111-bbbb-bbbb-bbbb-111111111111"),
                AttributeId = colorAttribute.Id,
                Value = "Siyah",
                ColorCode = "#000000",
                DisplayOrder = 1,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            },
            new ProductAttributeValue
            {
                Id = Guid.Parse("22222222-bbbb-bbbb-bbbb-222222222222"),
                AttributeId = colorAttribute.Id,
                Value = "Beyaz",
                ColorCode = "#FFFFFF",
                DisplayOrder = 2,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            },
            new ProductAttributeValue
            {
                Id = Guid.Parse("33333333-bbbb-bbbb-bbbb-333333333333"),
                AttributeId = colorAttribute.Id,
                Value = "Mavi",
                ColorCode = "#0000FF",
                DisplayOrder = 3,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            }
        };

        var storageValues = new List<ProductAttributeValue>
        {
            new ProductAttributeValue
            {
                Id = Guid.Parse("44444444-bbbb-bbbb-bbbb-444444444444"),
                AttributeId = storageAttribute.Id,
                Value = "128GB",
                DisplayOrder = 1,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            },
            new ProductAttributeValue
            {
                Id = Guid.Parse("55555555-bbbb-bbbb-bbbb-555555555555"),
                AttributeId = storageAttribute.Id,
                Value = "256GB",
                DisplayOrder = 2,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            },
            new ProductAttributeValue
            {
                Id = Guid.Parse("66666666-bbbb-bbbb-bbbb-666666666666"),
                AttributeId = storageAttribute.Id,
                Value = "512GB",
                DisplayOrder = 3,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            }
        };

        await context.ProductAttributeValues.AddRangeAsync(colorValues);
        await context.ProductAttributeValues.AddRangeAsync(storageValues);

        await context.Categories.AddRangeAsync(categories);
        await context.Brands.AddRangeAsync(brands);
        await context.SaveChangesAsync();
    }
}
