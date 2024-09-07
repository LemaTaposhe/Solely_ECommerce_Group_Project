using IsDB_R57_Solely.Entities.Cart;
using IsDB_R57_Solely.Entities.Orders;
using IsDB_R57_Solely.Enums;

namespace IsDB_R57_Solely.DAL.Interfaces
{
    public interface IPaymentRepository
    {
        Task<Order> UpdateOrderPaymentStatus(int orderId, PaymentStatus status);
    }
}
