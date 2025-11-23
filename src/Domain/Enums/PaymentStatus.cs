namespace Domain.Enums;

public enum PaymentStatus
{
    Pending = 1,
    Authorized = 2,
    Paid = 3,
    PartiallyRefunded = 4,
    Refunded = 5,
    Voided = 6,
    Failed = 7
}
