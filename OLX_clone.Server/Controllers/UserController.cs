using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OLX_clone.Server.Helpers;
using OLX_clone.Server.Models.Dtos.User;
using OLX_clone.Server.Services.UserService;

namespace OLX_clone.Server.Controllers;
   
[ApiController]
[Route("api/users")]
public class UserController: ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet("{userId}")]
    public async Task<ActionResult<ApiResponse<GetApplicationUserDetailsDto>>> GetUserProfile(string userId)
    {
        var apiResponse = await _userService.GetUserProfile(userId);
        if (!apiResponse.Success)
        {
            return NotFound(apiResponse);
        }
        return Ok(apiResponse);
    }
    
    [HttpPost("update-last-seen")]
    public async Task<ActionResult<ApiResponse<IEnumerable<IdentityError>>>> UpdateLastSeen([FromBody] string userId)
    {
        var apiResponse = await _userService.UpdateLastSeen(userId);
        if (!apiResponse.Success)
        {
            return BadRequest(apiResponse);
        }
        return Ok(apiResponse);
    }

    [HttpPost("update-online-status")]
    public async Task<ActionResult<ApiResponse<IEnumerable<IdentityError>>>> UpdateOnlineStatus([FromBody] string userId)
    {
        var apiResponse = await _userService.UpdateOnlineStatus(userId);
        if (!apiResponse.Success)
        {
            return BadRequest(apiResponse);
        }
        return Ok(apiResponse);
    }
}