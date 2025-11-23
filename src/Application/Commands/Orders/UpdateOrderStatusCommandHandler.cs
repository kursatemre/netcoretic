using Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace Application.Commands.Orders;

public class UpdateOrderStatusCommandHandler : IRequestHandler<UpdateOrderStatusCommand, UpdateOrderStatusResponse>
{
    private readonly IRepository<Order> _orderRepository;
    private readonly IRepository<OrderStatusHistory> _orderStatusHistoryRepository;
    private readonly IUnitOfWork _unitOfWork;

    public UpdateOrderStatusCommandHandler(
        IRepository<Order> orderRepository,
        IRepository<OrderStatusHistory> orderStatusHistoryRepository,
        IUnitOfWork unitOfWork)
    {
        _orderRepository = orderRepository;
        _orderStatusHistoryRepository = orderStatusHistoryRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<UpdateOrderStatusResponse> Handle(UpdateOrderStatusCommand request, CancellationToken cancellationToken)
    {
        var order = await _orderRepository.GetByIdAsync(request.OrderId);
        if (order == null)
        {
            throw new KeyNotFoundException($"Sipariş bulunamadı: {request.OrderId}");
        }

        var oldStatus = order.Status;
        var oldStatusString = oldStatus.ToString();

        // Update order status
        order.Status = request.NewStatus;
        order.UpdatedAt = DateTime.UtcNow;

        // Add status history
        var statusHistory = new OrderStatusHistory
        {
            Id = Guid.NewGuid(),
            OrderId = order.Id,
            Status = request.NewStatus,
            Note = request.Notes,
            ChangedAt = DateTime.UtcNow
        };

        await _orderRepository.UpdateAsync(order);
        await _orderStatusHistoryRepository.AddAsync(statusHistory);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return new UpdateOrderStatusResponse
        {
            OrderId = order.Id,
            OrderNumber = order.OrderNumber,
            OldStatus = oldStatusString,
            NewStatus = request.NewStatus.ToString(),
            UpdatedAt = order.UpdatedAt ?? DateTime.UtcNow
        };
    }
}
