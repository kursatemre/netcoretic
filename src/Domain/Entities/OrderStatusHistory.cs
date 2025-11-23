using Domain.Enums;

namespace Domain.Entities;

/// <summary>
/// Sipariş durum geçmişi
/// </summary>
public class OrderStatusHistory : BaseEntity
{
    public Guid OrderId { get; set; }
    public Order Order { get; set; } = null!;
    
    public OrderStatus Status { get; set; }
    public string? Note { get; set; }
    public DateTime ChangedAt { get; set; }
    public string? ChangedBy { get; set; }
}
