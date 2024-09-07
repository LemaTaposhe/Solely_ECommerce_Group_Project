using IsDB_R57_Solely.DAL.Interfaces;
using IsDB_R57_Solely.Entities.Cart;
using IsDB_R57_Solely.Entities.Orders;
using IsDB_R57_Solely.Entities.Payments;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace IsDB_R57_Solely.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private IPaymentRepository _paymentRepo;
        private readonly ILogger _logger;
        private const string WhSecret = "";

        public PaymentController(IPaymentRepository paymentRepo, ILogger<IPaymentRepository> logger)
        {
            _paymentRepo = paymentRepo;
            _logger = logger;
        }

        //[HttpPost("{cartId}")]
        //public async Task<ActionResult<Cart>> CreateOrUpdatePaymentIntent(string cartId)
        //{
        //    var cart = await _paymentRepo.CreateOrUpdatePaymentIntent(cartId);

        //    if (cart == null)
        //    {
        //        return BadRequest("Problem with your basket");
        //    }
        //    return cart;
        //}

        //[HttpPost("webhook")]
        //public async Task<ActionResult> StripeWebHook()
        //{
        //    var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
        //    var stripeEvent = EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signatiure"], WhSecret);

        //    PaymentIntent intent;
        //    Order order;

        //    switch (stripeEvent.Type)
        //    {
        //        case "payment_intent.succeeded":
        //            intent = (PaymentIntent)stripeEvent.Data.Object;
        //            _logger.LogInformation("Payment Succeeded", intent.Id);
        //            order = await _paymentRepo.UpdateOrderPaymentSucceded(intent.Id);
        //            _logger.LogInformation("Order Updated to payment recieved: ", order.OrderId);
        //            break;

        //        case "payment_intent.payment_failed":
        //            intent = (PaymentIntent)stripeEvent.Data.Object;
        //            _logger.LogInformation("Payment Failed", intent.Id);
        //            order = await _paymentRepo.UpdateOrderPaymentFailed(intent.Id);
        //            _logger.LogInformation("Payment failed: ", order.OrderId);
        //            break;

        //    }
        //    return new EmptyResult();
        //}
    }
}
