using Application.Commands.Products;
using Domain.Entities;
using Domain.Interfaces;
using FluentValidation;
using Infrastructure.Adapters.Payment;
using Infrastructure.Adapters.Shipping;
using Infrastructure.Data;
using Infrastructure.Repositories;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using API.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new()
    {
        Title = "E-Commerce API",
        Version = "v1",
        Description = "Kusursuz E-Ticaret Platformu API",
        Contact = new()
        {
            Name = "E-Commerce Team"
        }
    });

    // Ignore schema errors to prevent 500 errors
    options.CustomSchemaIds(type => type.FullName);
});

// Database Configuration
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        b => b.MigrationsAssembly("Infrastructure"));
});

// Redis Cache Configuration (Optional)
var redisConnection = builder.Configuration.GetConnectionString("Redis");
if (!string.IsNullOrEmpty(redisConnection))
{
    try
    {
        builder.Services.AddStackExchangeRedisCache(options =>
        {
            options.Configuration = redisConnection;
            options.InstanceName = "ECommerce_";
        });
        Console.WriteLine("✅ Redis cache enabled");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"⚠️ Redis cache disabled: {ex.Message}");
        builder.Services.AddDistributedMemoryCache(); // Fallback to in-memory cache
    }
}
else
{
    Console.WriteLine("⚠️ Redis connection string not found, using in-memory cache");
    builder.Services.AddDistributedMemoryCache(); // Fallback to in-memory cache
}

// Repository Pattern
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

// MediatR for CQRS
builder.Services.AddMediatR(cfg => 
    cfg.RegisterServicesFromAssembly(typeof(CreateProductCommand).Assembly));

// FluentValidation
builder.Services.AddValidatorsFromAssembly(typeof(CreateProductCommand).Assembly);

// Elasticsearch Search Service (Optional)
var elasticsearchUri = builder.Configuration["Elasticsearch:Uri"];
if (!string.IsNullOrEmpty(elasticsearchUri))
{
    try
    {
        builder.Services.AddSingleton<Application.Interfaces.IProductSearchService, Infrastructure.Search.ElasticsearchService>();
        Console.WriteLine("✅ Elasticsearch search enabled");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"⚠️ Elasticsearch disabled: {ex.Message}");
        builder.Services.AddSingleton<Application.Interfaces.IProductSearchService, Infrastructure.Search.NoOpProductSearchService>();
    }
}
else
{
    Console.WriteLine("⚠️ Elasticsearch URI not configured, search functionality disabled");
    builder.Services.AddSingleton<Application.Interfaces.IProductSearchService, Infrastructure.Search.NoOpProductSearchService>();
}

// Payment & Shipping Adapters
builder.Services.AddScoped<IPaymentProvider, IyzicoPaymentProvider>();
builder.Services.AddScoped<IShippingProvider, YurticiCargoProvider>();

// JWT Token Generator
builder.Services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();

// Password Hasher
builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();

// JWT Authentication
var jwtSecretKey = builder.Configuration["Jwt:SecretKey"] 
    ?? throw new InvalidOperationException("JWT SecretKey is not configured");

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecretKey))
    };
});

builder.Services.AddAuthorization();

builder.Services.AddAuthorization();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Apply Migrations and Seed Database
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    
    // Apply pending migrations
    await context.Database.MigrateAsync();
    
    // Seed initial data
    await DbSeeder.SeedAsync(context);
}

// Configure the HTTP request pipeline.
// Enable Swagger in all environments for API testing
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "E-Commerce API v1");
    c.RoutePrefix = "swagger"; // Access at /swagger
});

// Global Exception Handling
app.UseMiddleware<ExceptionHandlingMiddleware>();

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
