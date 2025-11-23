namespace Domain.Entities;

/// <summary>
/// Kullanıcı entity'si
/// </summary>
public class User : BaseEntity
{
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string? PhoneNumber { get; set; }
    
    public bool IsActive { get; set; }
    public bool EmailConfirmed { get; set; }
    public DateTime? LastLoginDate { get; set; }
    
    // İlişkiler
    public ICollection<Order> Orders { get; set; } = new List<Order>();
    public ICollection<UserAddress> Addresses { get; set; } = new List<UserAddress>();
    public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
}
