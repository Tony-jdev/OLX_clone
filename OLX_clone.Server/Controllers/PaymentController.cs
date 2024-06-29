using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OLX_clone.BusinessLogicLayer.Services.Contracts;
using OLX_clone.DataAccessLayer.Helpers;
using OLX_clone.DataAccessLayer.Models;
using OLX_clone.DataAccessLayer.Models.Dtos.Payment;

namespace OLX_clone.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PaymentController : ControllerBase
{
    private readonly IPaymentService _paymentService;
    private readonly IUserService _userService;

    public PaymentController(IPaymentService paymentService, IUserService userService)
    {
        _paymentService = paymentService;
        _userService = userService;
    }

    [HttpPost("charge")]
    public async Task<ActionResult<ApiResponse<object>>> Charge([FromBody] PaymentRequest paymentRequest)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new ApiResponse<IEnumerable<IdentityError>>
            {
                Success = false,
                Message = "Invalid payment request",
                Data = ModelState.Values.SelectMany(v => v.Errors).Select(e => new IdentityError { Description = e.ErrorMessage })
            });
        }

        var charge = await _paymentService.CreateCharge(paymentRequest);
        if (charge.Status == "succeeded")
        {
            var apiResponse = await _userService.UpdateBalance(new Transaction
            {
                Amount = paymentRequest.Amount,
                UserId = paymentRequest.UserId
            });

            if (apiResponse.Success)
            {
                return Ok(apiResponse);
            }

            return BadRequest(apiResponse);
        }

        return BadRequest(new ApiResponse<string>
        {
            Success = false,
            Message = "Payment failed!"
        });
    }
}