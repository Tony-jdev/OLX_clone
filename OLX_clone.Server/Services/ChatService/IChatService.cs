using OLX_clone.Server.Helpers;
using OLX_clone.Server.Models;
using OLX_clone.Server.Models.Dtos.Chat;
using OLX_clone.Server.Models.Dtos.ChatMessage;

namespace OLX_clone.Server.Services;

public interface IChatService
{
    Task<ApiResponse<Chat>> CreateChatAsync(CreateChatDto chatCreateDto);
    Task<ApiResponse<ChatMessage>> CreateChatMessageAsync(CreateChatMessageDto chatMessageCreateDto);
    Task<ApiResponse<List<GetChatDto>>> GetChatsByUserIdAsync(string userId);
    Task<ApiResponse<GetChatDetailsDto>> GetChatWithMessagesAsync(int id);
}