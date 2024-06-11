using OLX_clone.DataAccessLayer.Models;

namespace OLX_clone.DataAccessLayer.Repositories.Contracts;

public interface IChatRepository: IGenericRepository<Chat>
{
    Task<List<Chat>> GetAllChatsByUserIdAsync(string userId);
    Task<Chat> GetChatWithMessagesAsync(int id);
    Task<Chat> GetChatWithMessagesByParticipantsAsync(string senderId, string receiverId);
}