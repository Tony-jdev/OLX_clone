using Microsoft.EntityFrameworkCore;
using OLX_clone.DataAccessLayer.Models;
using OLX_clone.DataAccessLayer.Repositories.Contracts;

namespace OLX_clone.DataAccessLayer.Repositories;

public class ChatRepository: GenericRepository<Chat>, IChatRepository
{
    public ChatRepository(ApplicationDbContext context) : base(context)
    {
      
    }

    public async Task<List<Chat>> GetAllChatsByUserIdAsync(string userId)
    {
        return await _context.Chats.Where(c => c.SellerId == userId || c.CustomerId == userId).ToListAsync();
    }

    public async Task<Chat> GetChatWithMessagesAsync(int id)
    {
        return await _context.Chats.Include(c => c.Messages).Where(c => c.Id == id).FirstOrDefaultAsync();
    }
    
    public async Task<Chat> GetChatWithMessagesByParticipantsAsync(string senderId, string receiverId)
    {
        return await _context.Chats
            .Include(c => c.Messages)
            .Where(c => (c.CustomerId == senderId && c.SellerId == receiverId) || (c.CustomerId == receiverId && c.SellerId == senderId))
            .FirstOrDefaultAsync();
    }

}