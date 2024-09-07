using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IsDB_R57_Solely.Entities.Orders
{
    public class Invoice
    {
        [Key]
        public int InvoiceId { get; set; }
        public DateTime InvoiceDate { get; set; }

        public int OrderId { get; set; }
        public Order? Order { get; set; }

        public decimal TotalPrice { get; set; }
    }
}

