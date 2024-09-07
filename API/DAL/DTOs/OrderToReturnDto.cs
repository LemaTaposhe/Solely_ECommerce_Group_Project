using IsDB_R57_Solely.DAL.ViewModel;

namespace IsDB_R57_Solely.DAL.DTOs
{
    public class OrderToReturnDto
    {
        public int OrderId { get; set; }
        public string? CustomerEmail { get; set; }
        public DateTime OrderDate { get; set; }
        public OrderAddress? ShippingAddress { get; set; }
        public string? DeliveryMethod { get; set; }
        public decimal ShippingPrice { get; set; }
        public IReadOnlyList<OrderItemDto>? OrderItems { get; set; }
        public decimal Subtotal { get; set; }
        public decimal Total { get; set; }
        public string? Status { get; set; }
    }
}
