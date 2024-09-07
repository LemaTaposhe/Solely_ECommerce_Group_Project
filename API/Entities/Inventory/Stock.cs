using IsDB_R57_Solely.Entities.Products;
namespace IsDB_R57_Solely.Entities.Inventory
{
    public class Stock
    {
        public int StockId { get; set; }
        public DateTime LastPurchaseDate { get; set; }

        public int? ProductId { get; set; }
        public Product? Product { get; set; } 
        public int Quantity { get; set; }
    }
}
