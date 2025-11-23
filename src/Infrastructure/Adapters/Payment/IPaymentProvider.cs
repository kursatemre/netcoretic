namespace Infrastructure.Adapters.Payment;

/// <summary>
/// Ödeme sağlayıcı interface'i - Tüm ödeme adaptörleri bu interface'i implement eder
/// </summary>
public interface IPaymentProvider
{
    string ProviderName { get; }
    
    Task<PaymentResult> ProcessPaymentAsync(PaymentRequest request, CancellationToken cancellationToken = default);
    Task<RefundResult> RefundPaymentAsync(RefundRequest request, CancellationToken cancellationToken = default);
    Task<PaymentStatusResult> CheckPaymentStatusAsync(string transactionId, CancellationToken cancellationToken = default);
}

public class PaymentRequest
{
    public decimal Amount { get; set; }
    public string Currency { get; set; } = "TRY";
    public string OrderNumber { get; set; } = string.Empty;
    public string CardNumber { get; set; } = string.Empty;
    public string CardHolderName { get; set; } = string.Empty;
    public string ExpiryMonth { get; set; } = string.Empty;
    public string ExpiryYear { get; set; } = string.Empty;
    public string CVV { get; set; } = string.Empty;
    public string CustomerEmail { get; set; } = string.Empty;
    public string CustomerName { get; set; } = string.Empty;
}

public class PaymentResult
{
    public bool Success { get; set; }
    public string? TransactionId { get; set; }
    public string? ErrorMessage { get; set; }
    public string? ErrorCode { get; set; }
}

public class RefundRequest
{
    public string TransactionId { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public string Reason { get; set; } = string.Empty;
}

public class RefundResult
{
    public bool Success { get; set; }
    public string? RefundId { get; set; }
    public string? ErrorMessage { get; set; }
}

public class PaymentStatusResult
{
    public string Status { get; set; } = string.Empty;
    public bool IsPaid { get; set; }
    public decimal? Amount { get; set; }
}
