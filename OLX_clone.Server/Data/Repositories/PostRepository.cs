using Microsoft.EntityFrameworkCore;
using OLX_clone.Server.Data.Contracts;
using OLX_clone.Server.Models;

namespace OLX_clone.Server.Data.Repositories;

public class PostRepository: GenericRepository<Post>, IPostRepository
{
    public PostRepository(ApplicationDbContext context) : base(context)
    {
      
    }
    
    public async Task<List<Post>> GetVipPostsAsync()
    {
        return await _context.Posts
            .Where(p => p.IsVip)
            .OrderBy(p => Guid.NewGuid())
            .Take(20)
            .ToListAsync();
    }
    
    public async Task<List<Post>> GetAllAsync(string? searchTerm, string? orderBy)
    {
        IQueryable<Post> query = _context.Posts;

        if (!string.IsNullOrEmpty(searchTerm))
        {
            query = query.Where(p => p.Title.ToLower().Contains(searchTerm.ToLower()));
        }

        if (!string.IsNullOrEmpty(orderBy))
        {
            switch (orderBy.ToLower())
            {
                case "asc":
                    query = query.OrderBy(p => p.Price);
                    break;
                case "desc":
                    query = query.OrderByDescending(p => p.Price);
                    break;
                default:
                    query = query.OrderBy(p => p.Id);
                    break;
            }
        }
        else query = query.OrderBy(p => Guid.NewGuid());

        return await query.ToListAsync();
    }
    
    public async Task<List<Post>> GetAllByCategoryAsync(List<int> categoryIds, string? searchTerm, string? orderBy, int page)
    {
        var query = _context.Posts
            .Include(p => p.Category)
            .Where(p => categoryIds.Contains(p.CategoryId));

        if (!string.IsNullOrEmpty(searchTerm))
        {
            query = query.Where(p => p.Title.Contains(searchTerm));
        }

        if (!string.IsNullOrEmpty(orderBy))
        {
            switch (orderBy.ToLower())
            {
                case "asc":
                    query = query.OrderBy(p => p.Price);
                    break;
                case "desc":
                    query = query.OrderByDescending(p => p.Price);
                    break;
                default:
                    query = query.OrderBy(p => p.Id);
                    break;
            }
        }
        else query = query.OrderBy(p => Guid.NewGuid());

        return await query.ToListAsync();
    }
    
    public async Task<Post> GetPostDetailsBySkuAsync(string sku)
    {
        return await _context.Posts
            .Include(p => p.User)
            .Include(p => p.Category)
            .Where(p => p.SKU == sku).FirstOrDefaultAsync();
    }
}