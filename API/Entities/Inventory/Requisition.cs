using IsDB_R57_Solely.Entities.Products;
using System.ComponentModel.DataAnnotations;

namespace IsDB_R57_Solely.Entities.Inventory
{
    public class Requisition
    {
        [Key]
        public int RequisitionId { get; set; }

        public int? SupplierId { get; set; }
        public Supplier? Supplier { get; set; }

        public int? ProductId { get; set; }
        public Product? Product { get; set; }

        public DateTime RequisitionDate { get; set; }

        public int Quantity { get; set; }


    }
}