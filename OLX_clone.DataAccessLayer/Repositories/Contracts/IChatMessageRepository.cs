using OLX_clone.DataAccessLayer.Models;

namespace OLX_clone.DataAccessLayer.Repositories.Contracts;

public interface IChatMessageRepository: IGenericRepository<ChatMessage>
{
    Task<ChatMessage> GetLatestMessageByChatIdAsync(int chatId);
    Task<List<ChatMessage>> GetMessagesByIdsAsync(List<int> messageIds);
}