using IsDB_R57_Solely.Data;
using IsDB_R57_Solely.Entities.Cart;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IsDB_R57_Solely.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartItemsController : ControllerBase
    {

        private readonly SolelyDbContext _context;

        public CartItemsController(SolelyDbContext context)
        {
            _context = context;
        }

        [HttpGet("LatestCartItems")]
        [ProducesResponseType(typeof(List<CartItem>), 200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<IEnumerable<CartItem>>> GetLatestCartItems()
        {
            // Get the latest CartId
            var lastCartId = await _context.CartItems
                .OrderByDescending(ci => ci.CartItemId)
                .Select(ci => ci.CartId)
                .FirstOrDefaultAsync();

            if (lastCartId == null)
            {
                return NotFound("No CartItems found.");
            }

            // Get all CartItems with the latest CartId
            var cartItems = await _context.CartItems
                .Where(ci => ci.CartId == lastCartId)
                .ToListAsync();

            return Ok(cartItems);
        }
    }
}
