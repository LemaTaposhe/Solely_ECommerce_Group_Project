using IsDB_R57_Solely.DAL.Interfaces;
using IsDB_R57_Solely.DAL.ViewModel;
using IsDB_R57_Solely.Entities.Cart;
using IsDB_R57_Solely.Entities.Inventory;
using IsDB_R57_Solely.Entities.Orders;
using IsDB_R57_Solely.Entities.Products;
using IsDB_R57_Solely.Entities.Users;
using Stripe;
using Address = IsDB_R57_Solely.Entities.Users.Address;
using Product = IsDB_R57_Solely.Entities.Products.Product;

namespace IsDB_R57_Solely.DAL.DTOs
{
    public static class Mapper
    {
        public static CartItemDTO CartItemDto(CartItem cartItem,Product product)
        {
            return new CartItemDTO
            {
                Id = cartItem.CartItemId,
                ProductName = product.Name,
                Price = product.Price,
                Quantity = cartItem.Quantity,
                PictureUrl = product.ThumbnailImage,

            };
        }
        public static ProductDTO MapProductToProductDTO(Product product, Stock? stock)
        {
            if (product == null)
            {
                return null;
            }

            return new ProductDTO
            {
                ProductId = product.ProductId,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                NormalizedName = product.NormalizedName,
                ThumbnailImage = product.ThumbnailImage,

                Category = product.Category,
                Tag = product.Tag,
                Brand = product.Brand,
                Quantity = stock?.Quantity ?? 0,
                isActive = (bool)product.isActive,
                CreatedOn = product.CreatedOn
            };
        }

        public static AddressDTO MapToAddressDTO(Address address)
        {
            return new AddressDTO
            {
                Phone = address.Phone,
                AddressLine1 = address.AddressLine1,
                AddressLine2 = address.AddressLine2,
                City = address.City,
                ZipCode = address.ZipCode,
                DistrictId = address.DistrictId
            };

        }

        public static Address MapToAddress(AddressDTO addressDTO)
        {
            return new Address
            {
                Phone = addressDTO.Phone,
                AddressLine1 = addressDTO.AddressLine1,
                AddressLine2 = addressDTO.AddressLine2,
                City = addressDTO.City,
                ZipCode = addressDTO.ZipCode,
                DistrictId = addressDTO.DistrictId
            };
        }

        public static OrderAddress MapAddressDtoToOrderAddress(AddressDTO addressDto)
        {
            if (addressDto == null) return null;

            return new OrderAddress
            {
                Phone = addressDto.Phone, 
                AddressLine1 = addressDto.AddressLine1,
                AddressLine2 = addressDto.AddressLine2,
                City = addressDto.City,
                ZipCode = addressDto.ZipCode,
                DistrictId = addressDto.DistrictId 
            };
        }

        public static OrderToReturnDto MapOrderToOrderToReturnDto(Order order)
        {
            if (order == null) return null;

            return new OrderToReturnDto
            {
                OrderId = order.OrderId,
                CustomerEmail = order.CustomerEmail,
                OrderDate = order.OrderDate,
                ShippingAddress = order.ShippingAddress,
                DeliveryMethod = order.DeliveryMethod.ShortName,
                ShippingPrice = order.DeliveryMethod.Price,
                OrderItems = order.OrderItems?.Select(MapOrderItemToOrderItemDto).ToList().AsReadOnly(),
                Subtotal = order.SubTotal,
                Total = order.OrderTotal(),
                Status = order.Status.ToString()
            };
        }
        public static OrderItemDto MapOrderItemToOrderItemDto(OrderItem orderItem)
        {
            if (orderItem == null) return null;
            return new OrderItemDto
            {
                ProductId = orderItem.ProductId, 
                Price = orderItem.ProductPrice,
                Quantity = orderItem.Quantity
            };
        }
    }
}
