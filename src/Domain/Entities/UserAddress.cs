namespace Domain.Entities;

/// <summary>
/// Kullanıcı adresi
/// </summary>
public class UserAddress : BaseEntity
{
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
    
    public string Title { get; set; } = string.Empty; // Ev, İş vb.
    public string AddressLine1 { get; set; } = string.Empty;
    public string? AddressLine2 { get; set; }
    public string City { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;
    public string PostalCode { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public string? PhoneNumber { get; set; }
    
    public bool IsDefault { get; set; }
}
