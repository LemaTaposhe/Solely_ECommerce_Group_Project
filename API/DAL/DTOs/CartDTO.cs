using System.ComponentModel.DataAnnotations;

namespace IsDB_R57_Solely.DAL.DTOs
{
    public class CartDTO
    {
        [Required]
        public string Id { get; set; }
        public List<CartItemDTO> Items { get; set; }
        public int? DelivaryMethodId { get; set; }
        public string ClientSecret { get; set; }
        public string PaymentIntentId { get; set; }
    }
}
