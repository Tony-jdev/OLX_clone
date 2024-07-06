using OLX_clone.DataAccessLayer.Models;

namespace OLX_clone.DataAccessLayer.Repositories.Contracts;

public interface IChatRepository: IGenericRepository<Chat>
{
    Task<List<Chat>> GetAllChatsByUserIdAsync(string userId);
    Task<int> GetChatsCountByPostId(int postId);
    Task<Chat> GetChatByUsersAsync(string customerId, string sellerId, int postId);
    Task<Chat> GetChatWithMessagesAsync(int id);
    Task<Chat> GetChatWithMessagesByParticipantsAsync(string senderId, string receiverId);
}