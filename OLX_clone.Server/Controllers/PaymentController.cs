using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OLX_clone.Server.Helpers;
using OLX_clone.Server.Models.Dtos.Payment;
using OLX_clone.Server.Services.TransactionService;
using OLX_clone.Server.Services.UserService;
using Stripe;

namespace OLX_clone.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PaymentController : ControllerBase
{
    private readonly IConfiguration _congifuration;
    private readonly IUserService _userService;

    public PaymentController(IConfiguration configuration, IUserService userService)
    {
        _congifuration = configuration;
        _userService = userService;
    }
    
    [HttpPost("charge")]
    public async Task<ActionResult<ApiResponse<IEnumerable<IdentityError>>>> Charge([FromBody] PaymentRequest paymentRequest)
    {
        StripeConfiguration.ApiKey = _congifuration["StripeSettings:SecretKey"];
        try
        {
            var options = new ChargeCreateOptions
            {
                Amount = (int)(paymentRequest.Amount * 100),
                Currency = "uah",
                Source = paymentRequest.Token,
                Description = "Payment for account replenishment",
                Metadata = new Dictionary<string, string>
                {
                    { "UserId", paymentRequest.UserId }
                }
            };
            var service = new ChargeService();
            var charge = await service.CreateAsync(options);
            
            if (charge.Status == "succeeded")
            {
                var apiResponse = await _userService.UpdateBalance(paymentRequest.UserId, paymentRequest.Amount);
                if (apiResponse.Success)
                {
                    return Ok(apiResponse);
                }
                return BadRequest(apiResponse);
            }
            return BadRequest("Payment failed!");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred: {ex.Message}");
        }
    }
}