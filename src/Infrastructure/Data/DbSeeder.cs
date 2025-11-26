using Domain.Entities;

namespace Infrastructure.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(ApplicationDbContext context)
    {
        // Check if sample products already exist
        if (context.Products.Any(p => p.SKU == "SAM-S24-001"))
        {
            Console.WriteLine("⚠️ Seed data already exists, skipping...");
            return;
        }

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

        // Seed Sample Products
        var products = new List<Product>
        {
            new Product
            {
                Id = Guid.Parse("dddddddd-dddd-dddd-dddd-dddddddddddd"),
                Name = "Samsung Galaxy S24",
                Slug = "samsung-galaxy-s24",
                Description = "Samsung'un en yeni amiral gemisi telefonu. 200MP kamera, Snapdragon 8 Gen 3 işlemci, 6.2 inç Dynamic AMOLED ekran.",
                ShortDescription = "En son Galaxy serisi telefon",
                SKU = "SAM-S24-001",
                BasePrice = 45999,
                DiscountedPrice = 42999,
                IsActive = true,
                IsFeatured = true,
                CategoryId = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                BrandId = Guid.Parse("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"),
                CreatedAt = DateTime.UtcNow
            },
            new Product
            {
                Id = Guid.Parse("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee"),
                Name = "Nike Air Max 2024",
                Slug = "nike-air-max-2024",
                Description = "Klasik Air Max tasarımının modern yorumu. Maksimum konfor ve stil. Hava yastıklı taban, nefes alabilir üst yapı.",
                ShortDescription = "Yeni nesil Air Max",
                SKU = "NIKE-AM-2024",
                BasePrice = 5499,
                DiscountedPrice = 4999,
                IsActive = true,
                IsFeatured = true,
                CategoryId = Guid.Parse("22222222-2222-2222-2222-222222222222"),
                BrandId = Guid.Parse("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"),
                CreatedAt = DateTime.UtcNow
            },
            new Product
            {
                Id = Guid.Parse("ffffffff-ffff-ffff-ffff-ffffffffffff"),
                Name = "IKEA MALM Yatak Odası Takımı",
                Slug = "ikea-malm-yatak-odasi",
                Description = "Modern ve minimalist tasarımlı yatak odası takımı. Yatak, komodin, ve gardırop dahil. Beyaz meşe kaplama.",
                ShortDescription = "Komplet yatak odası seti",
                SKU = "IKEA-MALM-001",
                BasePrice = 15999,
                DiscountedPrice = 13999,
                IsActive = true,
                IsFeatured = false,
                CategoryId = Guid.Parse("33333333-3333-3333-3333-333333333333"),
                BrandId = Guid.Parse("cccccccc-cccc-cccc-cccc-cccccccccccc"),
                CreatedAt = DateTime.UtcNow
            }
        };

        await context.Products.AddRangeAsync(products);
        await context.SaveChangesAsync();

        // Seed Product Images
        var productImages = new List<ProductImage>
        {
            new ProductImage
            {
                Id = Guid.NewGuid(),
                ProductId = products[0].Id,
                ImageUrl = "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800",
                ThumbnailUrl = "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=200",
                DisplayOrder = 1,
                IsDefault = true,
                CreatedAt = DateTime.UtcNow
            },
            new ProductImage
            {
                Id = Guid.NewGuid(),
                ProductId = products[1].Id,
                ImageUrl = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
                ThumbnailUrl = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200",
                DisplayOrder = 1,
                IsDefault = true,
                CreatedAt = DateTime.UtcNow
            },
            new ProductImage
            {
                Id = Guid.NewGuid(),
                ProductId = products[2].Id,
                ImageUrl = "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
                ThumbnailUrl = "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=200",
                DisplayOrder = 1,
                IsDefault = true,
                CreatedAt = DateTime.UtcNow
            }
        };

        await context.ProductImages.AddRangeAsync(productImages);
        await context.SaveChangesAsync();

        Console.WriteLine("✅ Seed data successfully added: 3 categories, 3 brands, 3 products");
    }
}
