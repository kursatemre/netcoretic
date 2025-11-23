using Domain.Enums;

namespace Domain.Entities;

/// <summary>
/// Sipariş entity'si
/// </summary>
public class Order : BaseEntity
{
    public string OrderNumber { get; set; } = string.Empty;
    
    // Kullanıcı bilgisi
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
    
    // Fiyat bilgileri
    public decimal SubTotal { get; set; }
    public decimal ShippingCost { get; set; }
    public decimal TaxAmount { get; set; }
    public decimal DiscountAmount { get; set; }
    public decimal TotalAmount { get; set; }
    
    // Durum
    public OrderStatus Status { get; set; }
    public PaymentStatus PaymentStatus { get; set; }
    public ShippingStatus ShippingStatus { get; set; }
    
    // Adres bilgileri
    public string ShippingAddressLine1 { get; set; } = string.Empty;
    public string? ShippingAddressLine2 { get; set; }
    public string ShippingCity { get; set; } = string.Empty;
    public string ShippingState { get; set; } = string.Empty;
    public string ShippingPostalCode { get; set; } = string.Empty;
    public string ShippingCountry { get; set; } = string.Empty;
    public string ShippingPhoneNumber { get; set; } = string.Empty;
    
    public string BillingAddressLine1 { get; set; } = string.Empty;
    public string? BillingAddressLine2 { get; set; }
    public string BillingCity { get; set; } = string.Empty;
    public string BillingState { get; set; } = string.Empty;
    public string BillingPostalCode { get; set; } = string.Empty;
    public string BillingCountry { get; set; } = string.Empty;
    
    // Notlar
    public string? CustomerNote { get; set; }
    public string? AdminNote { get; set; }
    
    // Tarihler
    public DateTime? ShippedDate { get; set; }
    public DateTime? DeliveredDate { get; set; }
    
    // İlişkiler
    public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    public ICollection<OrderStatusHistory> StatusHistory { get; set; } = new List<OrderStatusHistory>();
}
