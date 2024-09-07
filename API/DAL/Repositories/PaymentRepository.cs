using IsDB_R57_Solely.DAL.Interfaces;
using IsDB_R57_Solely.DAL.SpecificQuery;
using IsDB_R57_Solely.Entities.Cart;
using IsDB_R57_Solely.Entities.Orders;
using IsDB_R57_Solely.Entities.Products;
using IsDB_R57_Solely.Enums;
using NuGet.ContentModel;
using Stripe;
using Product = IsDB_R57_Solely.Entities.Products.Product;

namespace IsDB_R57_Solely.DAL.Repositories
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly ICartRepository _cartRepo;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _config;

        public PaymentRepository(ICartRepository cartRepo, IConfiguration config, IUnitOfWork unitOfWork)
        {
            _cartRepo = cartRepo;
            _config = config;
            _unitOfWork = unitOfWork;
        }
        public async Task<Order> UpdateOrderPaymentStatus(int orderId, PaymentStatus status)
        {
            var order = await _unitOfWork.Repository<Order>().Get(orderId);

            if (order == null)
            {
                return null;
            }

            order.PaymentStatus = status;
            _unitOfWork.Repository<Order>().Update(order);
            await _unitOfWork.Complete();

            return order;
        }
    }
}
