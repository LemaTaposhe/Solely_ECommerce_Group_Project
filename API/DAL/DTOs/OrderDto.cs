namespace IsDB_R57_Solely.DAL.DTOs
{
    public class OrderDto
    {
        public string? CartId { get; set; }
        public int DeliveryMethodId { get; set; }
        public string OrderDetails { get; set; }
        public AddressDTO? ShipToAddress { get; set; }
    }
}
