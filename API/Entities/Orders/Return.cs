using IsDB_R57_Solely.Enums;
using System.ComponentModel.DataAnnotations;

namespace IsDB_R57_Solely.Entities.Orders
{
    public class Return
    {

        [Key]
        public int ReturnId { get; set; }

        public int InvoiceId { get; set; }
        public Invoice? Invoice { get; set; }

        public int OrderId { get; set; }
        public Order? Order { get; set; }

        public ReturnReason? ReturnReason { get; set; }

    }
}
