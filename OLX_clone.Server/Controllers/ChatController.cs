using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OLX_clone.Server.Helpers;
using OLX_clone.Server.Models;
using OLX_clone.Server.Models.Dtos.Chat;
using OLX_clone.Server.Services;

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

        try
        {
            var apiResponse = await _chatService.CreateChatAsync(chatCreateDto);
            if (!apiResponse.Success)
            {
                return NotFound(apiResponse);
            }
            return Ok(apiResponse);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ApiResponse<Chat> { Success = false, Message = ex.Message });
        }
    }

    [HttpGet("{id:int}", Name = "GetChat")]
    public async Task<ActionResult<ApiResponse<GetChatDetailsDto>>> GetChat(int id)
    {
        var apiResponse = await _chatService.GetChatWithMessagesAsync(id);
        if (!apiResponse.Success)
        {
            return NotFound(apiResponse);
        }
        return Ok(apiResponse);
    }

    [HttpGet("user/{userId}", Name = "GetChatsByUserId")]
    public async Task<ActionResult<ApiResponse<List<GetChatDto>>>> GetChatsByUserId(string userId)
    {
        var apiResponse = await _chatService.GetChatsByUserIdAsync(userId);
        if (!apiResponse.Success)
        {
            return NotFound(apiResponse);
        }
        return Ok(apiResponse);
    }

    [HttpPost("mark-as-read")]
    public async Task<ActionResult<ApiResponse<bool>>> MarkMessagesAsRead([FromBody] List<int> messageIds)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new ApiResponse<bool> { Success = false, Message = "Model is invalid" });
        }

        try
        {
            var apiResponse = await _chatService.MarkMessagesAsRead(messageIds);
            if (!apiResponse.Success)
            {
                return NotFound(apiResponse);
            }
            return Ok(apiResponse);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ApiResponse<bool> { Success = false, Message = ex.Message });
        }
    }
}
