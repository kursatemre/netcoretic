using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using MediatR;

namespace Application.Commands.Orders;

public class CreateOrderCommandHandler : IRequestHandler<CreateOrderCommand, CreateOrderResponse>
{
    private readonly IRepository<Order> _orderRepository;
    private readonly IRepository<OrderItem> _orderItemRepository;
    private readonly IRepository<Product> _productRepository;
    private readonly IRepository<ProductVariation> _productVariationRepository;
    private readonly IUnitOfWork _unitOfWork;

    public CreateOrderCommandHandler(
        IRepository<Order> orderRepository,
        IRepository<OrderItem> orderItemRepository,
        IRepository<Product> productRepository,
        IRepository<ProductVariation> productVariationRepository,
        IUnitOfWork unitOfWork)
    {
        _orderRepository = orderRepository;
        _orderItemRepository = orderItemRepository;
        _productRepository = productRepository;
        _productVariationRepository = productVariationRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<CreateOrderResponse> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
    {
        if (!request.Items.Any())
        {
            throw new InvalidOperationException("Sipariş en az bir ürün içermelidir.");
        }

        // Generate order number
        var orderNumber = GenerateOrderNumber();

        decimal totalAmount = 0;
        var orderItems = new List<OrderItem>();

        // Process each order item
        foreach (var itemDto in request.Items)
        {
            var product = await _productRepository.GetByIdAsync(itemDto.ProductId);
            if (product == null)
            {
                throw new KeyNotFoundException($"Ürün bulunamadı: {itemDto.ProductId}");
            }

            decimal unitPrice = product.DiscountedPrice ?? product.BasePrice;
            string productName = product.Name;
            string? sku = product.SKU;

            // If variation is specified, use variation price
            if (itemDto.ProductVariationId.HasValue)
            {
                var variations = await _productVariationRepository.GetAllAsync();
                var variation = variations.FirstOrDefault(v => v.Id == itemDto.ProductVariationId.Value);
                
                if (variation == null)
                {
                    throw new KeyNotFoundException($"Ürün varyasyonu bulunamadı: {itemDto.ProductVariationId}");
                }

                // Calculate price with variation adjustment
                var basePrice = product.DiscountedPrice ?? product.BasePrice;
                unitPrice = basePrice + (variation.PriceAdjustment ?? 0);
                productName = variation.Name;
                sku = variation.SKU;
            }

            var orderItem = new OrderItem
            {
                Id = Guid.NewGuid(),
                ProductId = itemDto.ProductId,
                ProductVariationId = itemDto.ProductVariationId,
                ProductName = productName,
                SKU = sku,
                Quantity = itemDto.Quantity,
                UnitPrice = unitPrice,
                TotalPrice = unitPrice * itemDto.Quantity,
                CreatedAt = DateTime.UtcNow
            };

            orderItems.Add(orderItem);
            totalAmount += orderItem.TotalPrice;
        }

        // Create order
        var order = new Order
        {
            Id = Guid.NewGuid(),
            OrderNumber = orderNumber,
            UserId = request.UserId,
            Status = OrderStatus.Pending,
            PaymentStatus = PaymentStatus.Pending,
            ShippingStatus = ShippingStatus.NotYetShipped,
            SubTotal = totalAmount,
            ShippingCost = 0, // TODO: Calculate shipping cost
            TaxAmount = totalAmount * 0.20m, // 20% KDV
            DiscountAmount = 0,
            TotalAmount = totalAmount + (totalAmount * 0.20m),
            ShippingAddressLine1 = string.Empty,
            ShippingCity = string.Empty,
            ShippingState = string.Empty,
            ShippingPostalCode = string.Empty,
            ShippingCountry = "Turkey",
            ShippingPhoneNumber = string.Empty,
            BillingAddressLine1 = string.Empty,
            BillingCity = string.Empty,
            BillingState = string.Empty,
            BillingPostalCode = string.Empty,
            BillingCountry = "Turkey",
            CustomerNote = request.Notes,
            CreatedAt = DateTime.UtcNow
        };

        await _orderRepository.AddAsync(order);

        // Add order items
        foreach (var item in orderItems)
        {
            item.OrderId = order.Id;
            await _orderItemRepository.AddAsync(item);
        }

        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return new CreateOrderResponse
        {
            OrderId = order.Id,
            OrderNumber = order.OrderNumber,
            TotalAmount = order.TotalAmount,
            Status = order.Status.ToString(),
            CreatedAt = order.CreatedAt
        };
    }

    private static string GenerateOrderNumber()
    {
        var timestamp = DateTime.UtcNow.ToString("yyyyMMddHHmmss");
        var random = new Random().Next(1000, 9999);
        return $"ORD-{timestamp}-{random}";
    }
}
