using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OLX_clone.BusinessLogicLayer.Services.Contracts;
using OLX_clone.DataAccessLayer.Helpers;
using OLX_clone.DataAccessLayer.Models.Dtos.User;

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
    
    [HttpPut("{userId}")]
    public async Task<ActionResult<ApiResponse<IEnumerable<IdentityError>>>> UpdateUser(
        string userId, [FromBody] UpdateApplicationUserDto applicationUserUpdateDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new ApiResponse<IEnumerable<IdentityError>> { Success = false, Message = "Model is invalid"});
        }

        if (userId != applicationUserUpdateDto.Id)
        {
            return BadRequest(new ApiResponse<IEnumerable<IdentityError>> { Success = false, Message = "Wrong user"});
        }

        var apiResponse = await _userService.UpdateUser(applicationUserUpdateDto);
        if (!apiResponse.Success)
        {
            return BadRequest(apiResponse);
        }
        return Ok(apiResponse);
    }

    [HttpPost("update-online-status")]
    public async Task<ActionResult<ApiResponse<IEnumerable<IdentityError>>>> UpdateOnlineStatus(string userId)
    {
        var apiResponse = await _userService.UpdateOnlineStatus(userId);
        if (!apiResponse.Success)
        {
            return BadRequest(apiResponse);
        }
        return Ok(apiResponse);
    }
}