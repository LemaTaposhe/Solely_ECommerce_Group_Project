using IsDB_R57_Solely.DAL.DTOs;
using IsDB_R57_Solely.DAL.Interfaces;
using IsDB_R57_Solely.DAL.ViewModel;
using IsDB_R57_Solely.Data;
using IsDB_R57_Solely.Entities.Orders;
using IsDB_R57_Solely.Entities.Products;
using IsDB_R57_Solely.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
using System.Security.Claims;


namespace IsDB_R57_Solely.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("AllowOrigin")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _orderService;
        private readonly IPurchaseRepository _stock;
        private readonly SolelyDbContext _context;

        public OrderController(IOrderRepository orderService, IPurchaseRepository stockRepository, SolelyDbContext context)
        {
            _context = context;
            _orderService = orderService;
            _stock = stockRepository;
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Order>> CreateOrder([FromBody] OrderDto orderDto)
        {
            var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

            if (email == null)
            {
                return Unauthorized();
            }

            var orderAddress = Mapper.MapAddressDtoToOrderAddress(orderDto.ShipToAddress);

            var order = await _orderService.CreateOrder(email, orderDto.DeliveryMethodId, orderDto.CartId, orderAddress);

            if (order == null)
            {
                return BadRequest("Order creation failed.");
            }

            return Ok(order);
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IReadOnlyList<OrderDto>>> GetOrderForUser()
        {
            var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

            if (email == null)
            {
                return Unauthorized();
            }

            var orders = await _orderService.GetOrdersForUser(email);
            var orderToReturnDtos = orders.Select(Mapper.MapOrderToOrderToReturnDto).ToList().AsReadOnly();

            return Ok(orderToReturnDtos);
        }



        [HttpGet("confirmed/{id}")]
        [Authorize]
        public async Task<ActionResult<OrderToReturnDto>> GetOrderById(int id)
        {
            var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

            if (email == null)
            {
                return Unauthorized();
            }

            var order = await _orderService.GetOrderById(id, email);

            if (order == null)
            {
                return NotFound();
            }

            return Mapper.MapOrderToOrderToReturnDto(order);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<Order>> Get()
        {

            var orders = await _orderService.GetAllOrders();
            var orderToReturnDtos = orders.Select(Mapper.MapOrderToOrderToReturnDto).ToList().AsReadOnly();

            return Ok(orderToReturnDtos);
        }

        [HttpPut("{id}/status")]
        //[Authorize]
        public async Task<ActionResult> UpdateOrderStatus(int id)
        {
            var order = await _context.Orders
           .Where(o => o.OrderId == id)
           .FirstOrDefaultAsync();

            if (order == null)
            {
                return NotFound();
            }

            order.Status = OrderStatus.Confirmed;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("delivery-methods")]
        public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetDeliveryMethods()
        {
            return Ok(await _orderService.GetDeliveryMethods());
        }
    }
}