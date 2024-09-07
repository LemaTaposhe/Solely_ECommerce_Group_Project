using IsDB_R57_Solely.DAL.ViewModel;
using IsDB_R57_Solely.Entities.Orders;
using IsDB_R57_Solely.Enums;


namespace IsDB_R57_Solely.DAL.Interfaces
{
    public interface IOrderRepository
    {
        Task<Order> CreateOrder(string customerEmail, int deliveryMethod, string id, OrderAddress orderAddress);

        Task<IReadOnlyList<Order>> GetOrdersForUser(string customerEmail);

        Task<Order> GetOrderById(int id, string customerEmail);

        Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethods();

        Task<Order> UpdateOrderPaymentStatus(int orderId, PaymentStatus status);

        Task<IReadOnlyList<Order>> GetAllOrders();
    }
}
