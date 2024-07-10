using Microsoft.EntityFrameworkCore;
using OLX_clone.DataAccessLayer.Models;
using OLX_clone.DataAccessLayer.Repositories.Contracts;

namespace OLX_clone.DataAccessLayer.Repositories;

public class ChatMessageRepository: GenericRepository<ChatMessage>, IChatMessageRepository
{
    public ChatMessageRepository(ApplicationDbContext context) : base(context)
    {
      
    }
    
    public async Task<ChatMessage> GetLatestMessageByChatIdAsync(int chatId)
    {
        return await _context.ChatMessages
            .Where(m => m.ChatId == chatId)
            .OrderByDescending(m => m.CreatedAt)
            .FirstOrDefaultAsync();
    }
    
    public async Task<List<ChatMessage>> GetMessagesByIdsAsync(List<int> messageIds)
    {
        return await _context.ChatMessages
            .Where(m => messageIds.Contains(m.Id))
            .ToListAsync();
    }

    public async Task<int> CountUnreadChatsAsync(string userId)
    {
        return await _context.ChatMessages
            .Where(m => m.ReceiverId == userId && !m.IsRead)
            .Select(m => m.ChatId)
            .Distinct()
            .CountAsync();
    }
}