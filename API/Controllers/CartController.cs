using IsDB_R57_Solely.DAL.Interfaces;
using IsDB_R57_Solely.Entities.Cart;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IsDB_R57_Solely.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        public readonly ICartRepository _repo;

        public CartController(ICartRepository cart)
        {
            _repo = cart;
        }

        [HttpGet]
        public async Task<ActionResult<Cart>> Get(string id)
        {
            var cart = await _repo.GetCartAsync(id);
            return Ok(cart?? new Cart(id));
        }

        [HttpPost("post")]
        public async Task<ActionResult<Cart>> Put(Cart cart)
        {
            var updateCart = await _repo.UpdateCartAsync(cart);
            return Ok(updateCart);
        }

        [HttpDelete]
        public async Task DeleteCart(string id)
        {
            await _repo.DeleteCartAsync(id);
        }

        [HttpDelete("{id}")]
        public async Task DeleteItem(int id)
        {
            await _repo.DeleteCartItem(id);
        }
    }
}
