using OLX_clone.DataAccessLayer.Helpers;
using OLX_clone.DataAccessLayer.Models;
using OLX_clone.DataAccessLayer.Models.Dtos.Chat;
using OLX_clone.DataAccessLayer.Models.Dtos.ChatMessage;

namespace OLX_clone.BusinessLogicLayer.Services.Contracts;

public interface IChatService
{
    Task<ApiResponse<Chat>> CreateChatAsync(CreateChatDto chatCreateDto);
    Task<ApiResponse<ChatMessage>> CreateChatMessageAsync(CreateChatMessageDto chatMessageCreateDto);
    Task<ApiResponse<List<GetChatDto>>> GetChatsByUserIdAsync(string userId);
    Task<ApiResponse<GetChatDetailsDto>> GetChatWithMessagesAsync(int id);
    Task<ApiResponse<bool>> MarkMessagesAsRead(List<int> messageIds);
    Task<ApiResponse<GetChatDetailsDto>> GetChatWithMessagesByParticipantsAsync(string senderId, string receiverId);
}