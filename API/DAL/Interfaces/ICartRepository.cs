using IsDB_R57_Solely.Entities.Cart;

namespace IsDB_R57_Solely.DAL.Interfaces
{
    public interface ICartRepository
    {
        Task<Cart> GetCartAsync(string id);
        Task<Cart> UpdateCartAsync(Cart cart);
        Task<bool> DeleteCartAsync(string id);
        Task DeleteCartItem(int id);
    }
}
