using IsDB_R57_Solely.DAL.Interfaces;
using IsDB_R57_Solely.DAL.Repositories;
using IsDB_R57_Solely.DAL.SpecificQuery;
using IsDB_R57_Solely.DAL.ViewModel;
using IsDB_R57_Solely.Data;
using IsDB_R57_Solely.Entities.Orders;
using IsDB_R57_Solely.Entities.Users;
using IsDB_R57_Solely.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.DotNet.Scaffolding.Shared.CodeModifier.CodeChange;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IsDB_R57_Solely.DAL.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly IProductRepository _productRepository;
        private readonly ICartRepository _cartRepo;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPurchaseRepository _stock;
        private readonly IGenericRepository<DeliveryMethod> _method;

        public OrderRepository(
            IGenericRepository<DeliveryMethod> method,
            IProductRepository productRepository,
            ICartRepository cartRepository,
            IUnitOfWork unitOfWork,
            IPurchaseRepository stockRepository)
        {
            _method = method;
            _productRepository = productRepository;
            _cartRepo = cartRepository;
            _unitOfWork = unitOfWork;
            _stock = stockRepository;
        }

        public async Task<Order> CreateOrder(string customerEmail, int deliveryMethodId, string cartId, OrderAddress orderAddress)
        {
            var cart = await _cartRepo.GetCartAsync(cartId);
            if (cart == null)
            {
                throw new ArgumentException($"Cart with id {cartId} not found.");
            }

            if (cart.Items == null || !cart.Items.Any())
            {
                throw new InvalidOperationException("Cart is empty or items are not available.");
            }

            var items = new List<OrderItem>();
            foreach (var item in cart.Items)
            {
                var product = await _productRepository.Get(item.ProductId);
                if (product == null)
                {
                    throw new ArgumentException($"Product with id {item.ProductId} not found.");
                }

                var orderItem = new OrderItem
                {
                    ProductId = product.ProductId,
                    ProductPrice = product.Price,
                    Quantity = item.Quantity
                };

                items.Add(orderItem);
            }

            var deliveryMethod = await _method.Get(deliveryMethodId);
            if (deliveryMethod == null)
            {
                throw new ArgumentException($"Delivery method with id {deliveryMethodId} not found.");
            }

            var subTotal = items.Sum(item => item.ProductPrice * item.Quantity);

            var order = new Order
            {
                CustomerEmail = customerEmail,
                ShippingAddress = orderAddress,
                DeliveryMethod = deliveryMethod,
                SubTotal = subTotal,
                OrderItems = items
            };

            _unitOfWork.Repository<Order>().Add(order);

            var result = await _unitOfWork.Complete();
            if (result <= 0)
            {
                throw new InvalidOperationException("Failed to create the order.");
            }

            foreach (var orderItem in items)
            {
                await _stock.UpdateStockQuantity(orderItem.ProductId, -orderItem.Quantity);
            }

            await _cartRepo.DeleteCartAsync(cartId);

            return order;
        }

        public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethods()
        {
            return await _unitOfWork.Repository<DeliveryMethod>().List();
        }

        public async Task<Order> GetOrderById(int id, string customerEmail)
        {
            var spec = new SpecificOrder(id, customerEmail);
            return await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
        }

        public async Task<IReadOnlyList<Order>> GetOrdersForUser(string customerEmail)
        {
            var spec = new SpecificOrder(customerEmail);
            return await _unitOfWork.Repository<Order>().List(spec);
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

        public async Task<Order> UpdateOrderStatus(int orderId)
        {
            var order = await _unitOfWork.Repository<Order>().Get(orderId);

            if (order == null)
            {
                return null;
            }

            order.Status = OrderStatus.Confirmed;
            _unitOfWork.Repository<Order>().Update(order);
            await _unitOfWork.Complete();

            return order;
        }

        public async Task<IReadOnlyList<Order>> GetAllOrders()
        {

            var spec = new SpecificOrder();
            return await _unitOfWork.Repository<Order>().List(spec);
        }
    }
}
