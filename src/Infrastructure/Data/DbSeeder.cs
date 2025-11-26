using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(ApplicationDbContext context)
    {
        // Check if sample products already exist
        if (await context.Products.AnyAsync(p => p.SKU == "SAM-S24-001"))
        {
            Console.WriteLine("⚠️ Seed data already exists, skipping...");
            return;
        }

        Console.WriteLine("🌱 Starting seed data...");

        // Get or create Categories
        var elektronikId = Guid.Parse("11111111-1111-1111-1111-111111111111");
        var giyimId = Guid.Parse("22222222-2222-2222-2222-222222222222");
        var mobilyaId = Guid.Parse("33333333-3333-3333-3333-333333333333");

        if (!await context.Categories.AnyAsync(c => c.Id == elektronikId))
        {
            await context.Categories.AddAsync(new Category
            {
                Id = elektronikId,
                Name = "Elektronik",
                Slug = "elektronik",
                Description = "Elektronik ürünler",
                DisplayOrder = 1,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            });
        }

        if (!await context.Categories.AnyAsync(c => c.Id == giyimId))
        {
            await context.Categories.AddAsync(new Category
            {
                Id = giyimId,
                Name = "Giyim",
                Slug = "giyim",
                Description = "Giyim ürünleri",
                DisplayOrder = 2,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            });
        }

        if (!await context.Categories.AnyAsync(c => c.Id == mobilyaId))
        {
            await context.Categories.AddAsync(new Category
            {
                Id = mobilyaId,
                Name = "Mobilya",
                Slug = "mobilya",
                Description = "Ev mobilyaları",
                DisplayOrder = 3,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            });
        }

        await context.SaveChangesAsync();

        // Get or create Brands
        var samsungId = Guid.Parse("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa");
        var nikeId = Guid.Parse("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb");
        var ikeaId = Guid.Parse("cccccccc-cccc-cccc-cccc-cccccccccccc");

        if (!await context.Brands.AnyAsync(b => b.Id == samsungId))
        {
            await context.Brands.AddAsync(new Brand
            {
                Id = samsungId,
                Name = "Samsung",
                Slug = "samsung",
                Description = "Samsung Electronics",
                IsActive = true,
                DisplayOrder = 1,
                CreatedAt = DateTime.UtcNow
            });
        }

        if (!await context.Brands.AnyAsync(b => b.Id == nikeId))
        {
            await context.Brands.AddAsync(new Brand
            {
                Id = nikeId,
                Name = "Nike",
                Slug = "nike",
                Description = "Nike Sports",
                IsActive = true,
                DisplayOrder = 2,
                CreatedAt = DateTime.UtcNow
            });
        }

        if (!await context.Brands.AnyAsync(b => b.Id == ikeaId))
        {
            await context.Brands.AddAsync(new Brand
            {
                Id = ikeaId,
                Name = "IKEA",
                Slug = "ikea",
                Description = "IKEA Furniture",
                IsActive = true,
                DisplayOrder = 3,
                CreatedAt = DateTime.UtcNow
            });
        }

        await context.SaveChangesAsync();

        // Get or create Product Attributes
        var colorAttrId = Guid.Parse("11111111-aaaa-aaaa-aaaa-111111111111");
        var sizeAttrId = Guid.Parse("22222222-aaaa-aaaa-aaaa-222222222222");
        var storageAttrId = Guid.Parse("33333333-aaaa-aaaa-aaaa-333333333333");

        if (!await context.ProductAttributes.AnyAsync(a => a.Id == colorAttrId))
        {
            await context.ProductAttributes.AddAsync(new ProductAttribute
            {
                Id = colorAttrId,
                Name = "Renk",
                Slug = "renk",
                Description = "Ürün rengi",
                DisplayOrder = 1,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            });
        }

        if (!await context.ProductAttributes.AnyAsync(a => a.Id == sizeAttrId))
        {
            await context.ProductAttributes.AddAsync(new ProductAttribute
            {
                Id = sizeAttrId,
                Name = "Beden",
                Slug = "beden",
                Description = "Ürün bedeni",
                DisplayOrder = 2,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            });
        }

        if (!await context.ProductAttributes.AnyAsync(a => a.Id == storageAttrId))
        {
            await context.ProductAttributes.AddAsync(new ProductAttribute
            {
                Id = storageAttrId,
                Name = "Hafıza",
                Slug = "hafiza",
                Description = "Cihaz hafızası",
                DisplayOrder = 3,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            });
        }

        await context.SaveChangesAsync();

        // Seed Attribute Values (only if not exist)
        var colorValues = new[]
        {
            (Id: Guid.Parse("11111111-bbbb-bbbb-bbbb-111111111111"), Value: "Siyah", ColorCode: "#000000"),
            (Id: Guid.Parse("22222222-bbbb-bbbb-bbbb-222222222222"), Value: "Beyaz", ColorCode: "#FFFFFF"),
            (Id: Guid.Parse("33333333-bbbb-bbbb-bbbb-333333333333"), Value: "Mavi", ColorCode: "#0000FF")
        };

        foreach (var (id, value, colorCode) in colorValues)
        {
            if (!await context.ProductAttributeValues.AnyAsync(v => v.Id == id))
            {
                await context.ProductAttributeValues.AddAsync(new ProductAttributeValue
                {
                    Id = id,
                    AttributeId = colorAttrId,
                    Value = value,
                    ColorCode = colorCode,
                    DisplayOrder = Array.IndexOf(colorValues, colorValues.First(x => x.Id == id)) + 1,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                });
            }
        }

        var storageValues = new[]
        {
            (Id: Guid.Parse("44444444-bbbb-bbbb-bbbb-444444444444"), Value: "128GB"),
            (Id: Guid.Parse("55555555-bbbb-bbbb-bbbb-555555555555"), Value: "256GB"),
            (Id: Guid.Parse("66666666-bbbb-bbbb-bbbb-666666666666"), Value: "512GB")
        };

        foreach (var (id, value) in storageValues)
        {
            if (!await context.ProductAttributeValues.AnyAsync(v => v.Id == id))
            {
                await context.ProductAttributeValues.AddAsync(new ProductAttributeValue
                {
                    Id = id,
                    AttributeId = storageAttrId,
                    Value = value,
                    DisplayOrder = Array.IndexOf(storageValues, storageValues.First(x => x.Id == id)) + 1,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                });
            }
        }

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
                CategoryId = elektronikId,
                BrandId = samsungId,
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
                CategoryId = giyimId,
                BrandId = nikeId,
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
                CategoryId = mobilyaId,
                BrandId = ikeaId,
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
