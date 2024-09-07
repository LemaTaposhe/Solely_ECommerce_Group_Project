using IsDB_R57_Solely.Entities.Products;
using IsDB_R57_Solely.Entities.Users;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace IsDB_R57_Solely.Entities.Cart
{
    public class CartItem
    {
        [Key]
        public int CartItemId { get; set; }

        public DateTime CreatedOn { get; set; }

        public int ProductId { get; set; }
        public Product? Product { get; set; }

        public int Quantity { get; set; }

        public decimal Price { get; set; }

        public string? CartId { get; set; }

        [JsonIgnore]
        public Cart? Cart { get; set; }
    }
}
