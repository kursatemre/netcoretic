namespace Infrastructure.Adapters.Payment;

/// <summary>
/// iyzico ödeme sağlayıcı adaptörü
/// </summary>
public class IyzicoPaymentProvider : IPaymentProvider
{
    public string ProviderName => "Iyzico";

    public async Task<PaymentResult> ProcessPaymentAsync(PaymentRequest request, CancellationToken cancellationToken = default)
    {
        // TODO: iyzico API entegrasyonu yapılacak
        // Bu örnek implementasyondur
        
        await Task.Delay(100, cancellationToken); // Simülasyon
        
        return new PaymentResult
        {
            Success = true,
            TransactionId = Guid.NewGuid().ToString(),
            ErrorMessage = null
        };
    }

    public async Task<RefundResult> RefundPaymentAsync(RefundRequest request, CancellationToken cancellationToken = default)
    {
        // TODO: iyzico refund API entegrasyonu
        
        await Task.Delay(100, cancellationToken);
        
        return new RefundResult
        {
            Success = true,
            RefundId = Guid.NewGuid().ToString()
        };
    }

    public async Task<PaymentStatusResult> CheckPaymentStatusAsync(string transactionId, CancellationToken cancellationToken = default)
    {
        // TODO: iyzico status check API
        
        await Task.Delay(100, cancellationToken);
        
        return new PaymentStatusResult
        {
            Status = "Paid",
            IsPaid = true,
            Amount = 100.00m
        };
    }
}
