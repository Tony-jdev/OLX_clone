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
    
    public async Task<List<Post>> GetAllAsync()
    {
        return await _context.Posts.Include(p => p.User).ToListAsync();
    }
    
    public async Task<Post> GetAsync(int? id)
    {
        if (id is null)
        {
            return null;
        }

        return await _context.Posts.Include(p => p.User).Where(p => p.Id == id).FirstOrDefaultAsync();
    }
}