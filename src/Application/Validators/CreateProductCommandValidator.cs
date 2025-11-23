using FluentValidation;

namespace Application.Commands.Products;

/// <summary>
/// CreateProductCommand için Validator
/// </summary>
public class CreateProductCommandValidator : AbstractValidator<CreateProductCommand>
{
    public CreateProductCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Ürün adı zorunludur")
            .MaximumLength(200).WithMessage("Ürün adı en fazla 200 karakter olabilir");

        RuleFor(x => x.Slug)
            .NotEmpty().WithMessage("Slug zorunludur")
            .MaximumLength(200).WithMessage("Slug en fazla 200 karakter olabilir");

        RuleFor(x => x.SKU)
            .NotEmpty().WithMessage("SKU zorunludur")
            .MaximumLength(100).WithMessage("SKU en fazla 100 karakter olabilir");

        RuleFor(x => x.BasePrice)
            .GreaterThan(0).WithMessage("Fiyat 0'dan büyük olmalıdır");

        RuleFor(x => x.CategoryId)
            .NotEmpty().WithMessage("Kategori seçilmelidir");
    }
}
