using Microsoft.EntityFrameworkCore;
using OLX_clone.Server.Data.Contracts;
using OLX_clone.Server.Models;

namespace OLX_clone.Server.Data.Repositories;

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
}