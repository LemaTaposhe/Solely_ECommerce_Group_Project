using IsDB_R57_Solely.DAL.Interfaces;
using IsDB_R57_Solely.Data;
using IsDB_R57_Solely.Entities.Cart;
using Microsoft.EntityFrameworkCore;

namespace IsDB_R57_Solely.DAL.Repositories
{
    public class CartRepository : ICartRepository
    {
        public readonly SolelyDbContext _context;

        public CartRepository(SolelyDbContext context)
        {
            _context = context;
        }

        public async Task<Cart> GetCartAsync(string id)
        {
            return await _context.Carts.Include(b => b.Items).FirstOrDefaultAsync(a => a.CartId == id);
        }

        public async Task<Cart> UpdateCartAsync(Cart cart)
        {
            Cart existingCart = await _context.Carts.FirstOrDefaultAsync(b => b.CartId == cart.CartId);

            if (existingCart != null)
            {

                foreach (var cartItem in cart.Items)
                {
                    cartItem.Cart = existingCart;
                }
                _context.CartItems.UpdateRange(cart.Items);
            }
            else
            {
                foreach (var cartItem in cart.Items)
                {
                    cartItem.Cart = cart;
                }
                _context.Carts.Add(cart);
            }

            await _context.SaveChangesAsync();

            return cart;
        }

        public async Task DeleteCartItem(int id)
        {
            var cart = await _context.CartItems.FirstOrDefaultAsync(b => b.CartItemId == id);
            _context.CartItems.Remove(cart);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteCartAsync(string id)
        {
            var cart = await _context.Carts.Include(a => a.Items).FirstOrDefaultAsync(b => b.CartId == id);

            if (cart == null)
            {
                return true;
            }

            _context.Carts.Remove(cart);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
