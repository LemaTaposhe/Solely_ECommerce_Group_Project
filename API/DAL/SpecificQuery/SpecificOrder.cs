using IsDB_R57_Solely.Entities.Orders;
using IsDB_R57_Solely.Enums;

namespace IsDB_R57_Solely.DAL.SpecificQuery
{
    public class SpecificOrder : BaseSpecification<Order>
    {
        public SpecificOrder(string email) : base(o => o.CustomerEmail == email)
        {
            AddInclude(o => o.OrderItems);
            AddInclude(o => o.DeliveryMethod);

            AddOrderByDesc(o => o.OrderDate);
        }

        public SpecificOrder(int id, string email) : base(o => o.OrderId == id && o.CustomerEmail == email)
        {
            AddInclude(o => o.OrderItems);
            AddInclude(o => o.DeliveryMethod);
        }

        public SpecificOrder()
        {
            AddInclude(o => o.OrderItems);
            AddInclude(o => o.DeliveryMethod);
        }
    }
}
