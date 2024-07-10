using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OLX_clone.BusinessLogicLayer.Services.Contracts;
using OLX_clone.DataAccessLayer.Helpers;
using OLX_clone.DataAccessLayer.Models;
using OLX_clone.DataAccessLayer.Models.Dtos.Chat;

namespace OLX_clone.Server.Controllers;

[ApiController]
[Route("api/chats")]
//[Authorize]
public class ChatController : ControllerBase
{
    private readonly IChatService _chatService;

    public ChatController(IChatService chatService)
    {
        _chatService = chatService;
    }

    [HttpPost]
    public async Task<ActionResult<ApiResponse<Chat>>> CreateChat([FromBody] CreateChatDto chatCreateDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new ApiResponse<Chat> { Success = false, Message = "Model is invalid" });
        }

        var apiResponse = await _chatService.CreateChatAsync(chatCreateDto);
        return apiResponse.Success ? Ok(apiResponse) : BadRequest(apiResponse);
    }

    [HttpGet(Name = "GetChatByUsers")]
    public async Task<ActionResult<ApiResponse<GetChatDetailsDto>>> GetChatByUsers(string customerId, string sellerId, int postId)
    {
        var apiResponse = await _chatService.GetChatByUsersAsync(customerId, sellerId, postId);
        return apiResponse.Success ? Ok(apiResponse) : BadRequest(apiResponse);
    }
    
    [HttpGet("{id:int}", Name = "GetChat")]
    public async Task<ActionResult<ApiResponse<GetChatDetailsDto>>> GetChat(int id)
    {
        var apiResponse = await _chatService.GetChatWithMessagesAsync(id);
        return apiResponse.Success ? Ok(apiResponse) : BadRequest(apiResponse);
    }

    [HttpGet("user/{userId}", Name = "GetChatsByUserId")]
    public async Task<ActionResult<ApiResponse<List<GetChatDto>>>> GetChatsByUserId(string userId)
    {
        var apiResponse = await _chatService.GetChatsByUserIdAsync(userId);
        return apiResponse.Success ? Ok(apiResponse) : BadRequest(apiResponse);
    }
    
    [HttpGet("unread-count/{userId}")]
    public async Task<ActionResult<ApiResponse<int>>> GetUnreadChatCount(string userId)
    {
        if (string.IsNullOrEmpty(userId))
        {
            return BadRequest("User ID is required");
        }

        var apiResponse = await _chatService.GetUnreadChatCountAsync(userId);
        return apiResponse.Success ? Ok(apiResponse) : BadRequest(apiResponse);
    }

    [HttpPost("mark-as-read")]
    public async Task<ActionResult<ApiResponse<bool>>> MarkMessagesAsRead([FromBody] List<int> messageIds)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new ApiResponse<bool> { Success = false, Message = "Model is invalid" });
        }

        var apiResponse = await _chatService.MarkMessagesAsRead(messageIds);
        return apiResponse.Success ? Ok(apiResponse) : BadRequest(apiResponse);
    }
}