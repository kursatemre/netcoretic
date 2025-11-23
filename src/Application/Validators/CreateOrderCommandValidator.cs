using Application.Commands.Orders;
using FluentValidation;

namespace Application.Validators;

public class CreateOrderCommandValidator : AbstractValidator<CreateOrderCommand>
{
    public CreateOrderCommandValidator()
    {
        RuleFor(x => x.Items)
            .NotEmpty()
            .WithMessage("Sipariş en az bir ürün içermelidir.");

        RuleForEach(x => x.Items).ChildRules(item =>
        {
            item.RuleFor(x => x.ProductId)
                .NotEmpty()
                .WithMessage("Ürün ID'si gereklidir.");

            item.RuleFor(x => x.Quantity)
                .GreaterThan(0)
                .WithMessage("Miktar 0'dan büyük olmalıdır.");
        });
    }
}
