using Microsoft.EntityFrameworkCore;
using OLX_clone.Server.Data.Contracts;
using OLX_clone.Server.Data.Repositories.GenericRepositor;
using OLX_clone.Server.Models;

namespace OLX_clone.Server.Data.Repositories;

public class PostRepository: GenericRepository<Post>, IPostRepository
{
    public PostRepository(ApplicationDbContext context) : base(context)
    {
      
    }
    
    public async Task<List<Post>> GetAllDetailedAsync()
    {
        return await _context.Posts.Include(p => p.User).ToListAsync();
    }
    
    public async Task<Post> GetDetailsAsync(int? id)
    {
        if (id is null)
        {
            return null;
        }

        return await _context.Posts.Include(p => p.User)
            .Include(p => p.Categories).Where(p => p.Id == id).FirstOrDefaultAsync();
    }
}