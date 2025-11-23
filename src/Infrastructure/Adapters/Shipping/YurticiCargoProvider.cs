namespace Infrastructure.Adapters.Shipping;

/// <summary>
/// Yurtiçi Kargo adaptörü
/// </summary>
public class YurticiCargoProvider : IShippingProvider
{
    public string ProviderName => "Yurtiçi Kargo";

    public async Task<ShippingQuoteResult> GetShippingQuoteAsync(ShippingQuoteRequest request, CancellationToken cancellationToken = default)
    {
        // TODO: Yurtiçi Kargo API entegrasyonu
        
        await Task.Delay(100, cancellationToken);
        
        // Basit fiyat hesaplama simülasyonu
        var cost = request.Weight * 5.0m + 15.0m;
        
        return new ShippingQuoteResult
        {
            Success = true,
            Cost = cost,
            EstimatedDeliveryDays = 3
        };
    }

    public async Task<CreateShipmentResult> CreateShipmentAsync(CreateShipmentRequest request, CancellationToken cancellationToken = default)
    {
        // TODO: Yurtiçi Kargo shipment oluşturma API
        
        await Task.Delay(100, cancellationToken);
        
        return new CreateShipmentResult
        {
            Success = true,
            ShipmentId = Guid.NewGuid().ToString(),
            TrackingNumber = $"YK{DateTime.Now:yyyyMMdd}{Random.Shared.Next(1000, 9999)}"
        };
    }

    public async Task<TrackingResult> TrackShipmentAsync(string trackingNumber, CancellationToken cancellationToken = default)
    {
        // TODO: Yurtiçi Kargo tracking API
        
        await Task.Delay(100, cancellationToken);
        
        return new TrackingResult
        {
            Success = true,
            Status = "In Transit",
            Events = new List<TrackingEvent>
            {
                new TrackingEvent
                {
                    Timestamp = DateTime.Now.AddDays(-2),
                    Status = "Picked Up",
                    Location = "İstanbul",
                    Description = "Kargo şubeden alındı"
                },
                new TrackingEvent
                {
                    Timestamp = DateTime.Now.AddDays(-1),
                    Status = "In Transit",
                    Location = "Ankara",
                    Description = "Transfer merkezinde"
                }
            }
        };
    }

    public async Task<CancelShipmentResult> CancelShipmentAsync(string shipmentId, CancellationToken cancellationToken = default)
    {
        // TODO: Yurtiçi Kargo iptal API
        
        await Task.Delay(100, cancellationToken);
        
        return new CancelShipmentResult
        {
            Success = true
        };
    }
}
