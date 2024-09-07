using IsDB_R57_Solely.Entities.Products;

namespace IsDB_R57_Solely.Entities.Inventory
{
    public class Purchase
    {
        public int PurchaseId { get; set; }
        public DateTimeOffset PurchaseDate { get; set; } = DateTimeOffset.Now;

        public int ProductId { get; set; }
        public Product? Product { get; set; }

        public int SupplierId { get; set; }
        public Supplier? Supplier { get; set; }

        public int PurchaseQuantity { get; set; }

        public decimal PurchasePrice { get; set; }
    }
}
