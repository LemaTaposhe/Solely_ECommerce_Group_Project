using IsDB_R57_Solely.Enums;
using IsDB_R57_Solely.Entities.Orders;
using System.ComponentModel.DataAnnotations.Schema;

namespace IsDB_R57_Solely.Entities.Payments
{
    public class Payment
    {
        public int PaymentId { get; set; }

        public PaymentMethod? PaymentMethod { get; set; }
    }
}
