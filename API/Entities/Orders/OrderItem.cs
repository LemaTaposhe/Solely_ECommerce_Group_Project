using IsDB_R57_Solely.DAL.ViewModel;
using IsDB_R57_Solely.Entities.Products;
using System.ComponentModel.DataAnnotations.Schema;

namespace IsDB_R57_Solely.Entities.Orders
{
    public class OrderItem
    {
        public OrderItem()
        {

        }
        public OrderItem(int ProudctId, decimal price, int quantity)
        {
            
        }
        public int OrderItemId { get; set; }
        public int ProductId { get; set; }
        public decimal ProductPrice { get; set; }
        public int Quantity { get; set; }
    }
}
