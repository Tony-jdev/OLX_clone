using Microsoft.EntityFrameworkCore;
using OLX_clone.Server.Data.Contracts;
using OLX_clone.Server.Models;

namespace OLX_clone.Server.Data.Repositories;

public class PostRepository: GenericRepository<Post>, IPostRepository
{
    public PostRepository(ApplicationDbContext context) : base(context)
    {
      
    }
    
    public async Task<Post> GetPostDetailsBySkuAsync(string sku)
    {
        return await _context.Posts.Include(p => p.User)
            .Include(p => p.Category).Where(p => p.SKU == sku).FirstOrDefaultAsync();
    }
    
    public async Task<List<Post>> GetAllDetailedAsync(string? searchTerm)
    {
        if (searchTerm is null)
        {
            return await _context.Posts.Include(p => p.User).ToListAsync();
        }
        return await _context.Posts.Where(p => p.Title.ToLower().Contains(searchTerm.ToLower()))
            .Include(p => p.User).ToListAsync();
    }
    
    public async Task<List<Post>> GetAllByCategoryAsync(int categoryId)
    {
        return await _context.Posts.Where(p => p.CategoryId == categoryId).ToListAsync();
    }
    
    public async Task<Post> GetDetailsAsync(int? id)
    {
        if (id is null)
        {
            return null;
        }

        return await _context.Posts.Include(p => p.User)
            .Include(p => p.Category).Where(p => p.Id == id).FirstOrDefaultAsync();
    }
}