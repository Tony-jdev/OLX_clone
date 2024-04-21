using OLX_clone.Server.Models;

namespace OLX_clone.Server.Data.Contracts;

public interface IChatMessageRepository: IGenericRepository<ChatMessage>
{
    Task<ChatMessage> GetLatestMessageByChatIdAsync(int chatId);
    Task<List<ChatMessage>> GetMessagesByIdsAsync(List<int> messageIds);
}