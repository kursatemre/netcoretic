namespace Infrastructure.Adapters.Shipping;

/// <summary>
/// Kargo sağlayıcı interface'i - Tüm kargo adaptörleri bu interface'i implement eder
/// </summary>
public interface IShippingProvider
{
    string ProviderName { get; }
    
    Task<ShippingQuoteResult> GetShippingQuoteAsync(ShippingQuoteRequest request, CancellationToken cancellationToken = default);
    Task<CreateShipmentResult> CreateShipmentAsync(CreateShipmentRequest request, CancellationToken cancellationToken = default);
    Task<TrackingResult> TrackShipmentAsync(string trackingNumber, CancellationToken cancellationToken = default);
    Task<CancelShipmentResult> CancelShipmentAsync(string shipmentId, CancellationToken cancellationToken = default);
}

public class ShippingQuoteRequest
{
    public string FromPostalCode { get; set; } = string.Empty;
    public string ToPostalCode { get; set; } = string.Empty;
    public decimal Weight { get; set; } // kg
    public decimal Length { get; set; } // cm
    public decimal Width { get; set; } // cm
    public decimal Height { get; set; } // cm
}

public class ShippingQuoteResult
{
    public bool Success { get; set; }
    public decimal? Cost { get; set; }
    public int? EstimatedDeliveryDays { get; set; }
    public string? ErrorMessage { get; set; }
}

public class CreateShipmentRequest
{
    public string OrderNumber { get; set; } = string.Empty;
    public string RecipientName { get; set; } = string.Empty;
    public string RecipientPhone { get; set; } = string.Empty;
    public string AddressLine1 { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string PostalCode { get; set; } = string.Empty;
    public decimal Weight { get; set; }
}

public class CreateShipmentResult
{
    public bool Success { get; set; }
    public string? ShipmentId { get; set; }
    public string? TrackingNumber { get; set; }
    public string? ErrorMessage { get; set; }
}

public class TrackingResult
{
    public bool Success { get; set; }
    public string Status { get; set; } = string.Empty;
    public List<TrackingEvent> Events { get; set; } = new();
    public string? ErrorMessage { get; set; }
}

public class TrackingEvent
{
    public DateTime Timestamp { get; set; }
    public string Status { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}

public class CancelShipmentResult
{
    public bool Success { get; set; }
    public string? ErrorMessage { get; set; }
}
