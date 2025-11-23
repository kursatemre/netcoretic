namespace Domain.Entities;

/// <summary>
/// Rol entity'si
/// </summary>
public class Role : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    
    // İlişkiler
    public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
}
