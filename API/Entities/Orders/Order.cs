using IsDB_R57_Solely.Enums;
using IsDB_R57_Solely.Entities.Users;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using IsDB_R57_Solely.DAL.ViewModel;

namespace IsDB_R57_Solely.Entities.Orders
{
    public class Order
    {
        public Order()
        {
            OrderDate = DateTime.Now;
        }
        public Order(IReadOnlyList<OrderItem> items, string customerEmail, OrderAddress orderAddress, DeliveryMethod deliveryMethod,decimal subtotal)
        {
            CustomerEmail = customerEmail;
            ShippingAddress = orderAddress;
            DeliveryMethod = deliveryMethod;
            OrderItems= items;
            SubTotal= subtotal;
        }
        [Key]
        public int OrderId { get; set; }
        public string CustomerEmail { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public decimal SubTotal { get; set; }
        public OrderAddress? ShippingAddress { get; set; }
        public IReadOnlyList<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
        public OrderStatus Status { get; set; } 
        public PaymentStatus PaymentStatus { get; set; }
        public string? OrderNote { get; set; }
        public DeliveryMethod DeliveryMethod { get; set; } 
        public decimal OrderTotal() 
        { 
            return SubTotal + DeliveryMethod.Price;
        }
    }
}
