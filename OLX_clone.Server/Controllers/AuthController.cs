using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OLX_clone.BusinessLogicLayer.Services.Contracts;
using OLX_clone.DataAccessLayer.Helpers;
using OLX_clone.DataAccessLayer.Models;
using OLX_clone.DataAccessLayer.Models.Dtos.Auth;

namespace OLX_clone.Server.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly IEmailService _emailService;
    private readonly UserManager<ApplicationUser> _userManager;

    public AuthController(IAuthService authService, IEmailService emailService, UserManager<ApplicationUser> userManager)
    {
        _authService = authService;
        _userManager = userManager;
        _emailService = emailService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<ApiResponse<bool>>> Register([FromBody] RegisterRequestDto model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new ApiResponse<bool>
            {
                Success = false,
                Message = "Invalid registration details"
            });
        }

        var apiResponse = await _authService.Register(model);
        if (!apiResponse.Success)
        {
            return BadRequest(apiResponse);
        }
        return Ok(apiResponse);
    }

    [HttpPost("login")]
    public async Task<ActionResult<ApiResponse<LoginResponseDto>>> Login([FromBody] LoginRequestDto model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new ApiResponse<LoginResponseDto>
            {
                Success = false,
                Message = "Invalid login details"
            });
        }

        var apiResponse = await _authService.Login(model);
        if (!apiResponse.Success)
        {
            return BadRequest(apiResponse);
        }
        return Ok(apiResponse);
    }
    
    [HttpPost("forgot-password")]
    public async Task<ActionResult<ApiResponse<string>>> ForgotPassword(ForgotPasswordDto model)
    {
        if (!ModelState.IsValid)
            return BadRequest(new ApiResponse<string> { Success = false, Message = "Invalid data provided" });

        var apiResponse = await _authService.ForgotPassword(model.Email);
        return apiResponse.Success ? Ok(apiResponse) : BadRequest(apiResponse);
    }

    [HttpPost("reset-password")]
    public async Task<ActionResult<ApiResponse<string>>> ResetPassword(ResetPasswordDto model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new ApiResponse<string> { Success = false, Message = "Invalid data provided" });
        }

        var apiResponse = await _authService.ResetPassword(model.UserId, model.Token, model.NewPassword);
        return apiResponse.Success ? Ok(apiResponse) : StatusCode(500, apiResponse);
    }
}