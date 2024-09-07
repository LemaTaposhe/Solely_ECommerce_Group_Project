using IsDB_R57_Solely.Entities.Products;
using System.ComponentModel.DataAnnotations;

namespace IsDB_R57_Solely.Entities.Inventory
{
    public class Supplier
    {
        [Key]
        public int SupplierId { get; set; }

        public string? SupplierName { get; set; }
        public string? Email { get; set; }
        public string? ContactNo { get; set; }
        public string? Address { get; set; }
        public bool? isActive { get; set; } = true;
    }
}
