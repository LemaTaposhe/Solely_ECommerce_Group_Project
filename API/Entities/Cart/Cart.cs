using IsDB_R57_Solely.Entities.Users;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace IsDB_R57_Solely.Entities.Cart
{
    public class Cart
    {
        public Cart()
        {

        }
        public Cart(string id)
        {
            CartId = id;
        }
        [Key]
        public string CartId { get; set; }

        public int? CustomerId { get; set; }
        //[JsonIgnore]
        //public User? Customer { get; set; }

        //public string? PaymentIntentId { get; set; }
        public int? DelivaryMethodId { get; set; }
        //public string? ClientSecret { get; set; }
        public List<CartItem> Items { get; set; } = new List<CartItem>();

        public DateTime CreatedOn { get; set; } = DateTime.Now;
    }

}
