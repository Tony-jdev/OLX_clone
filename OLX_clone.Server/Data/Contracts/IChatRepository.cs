using OLX_clone.Server.Models;
using OLX_clone.Server.Models.Dtos.Chat;

namespace OLX_clone.Server.Data.Contracts;

public interface IChatRepository: IGenericRepository<Chat>
{
    Task<List<Chat>> GetAllChatsByUserIdAsync(string userId);
    Task<Chat> GetChatWithMessagesAsync(int id);
}