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

        return await query.ToListAsync();
    }
    
    public async Task<List<Post>> GetAllByCategoryAsync(string categorySku, string? searchTerm, string? orderBy)
    {
        IQueryable<Post> query = _context.Posts.Where(p => p.Category.SKU == categorySku);

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
                case "вуіс":
                    query = query.OrderByDescending(p => p.Price);
                    break;
                default:
                    query = query.OrderBy(p => p.Id);
                    break;
            }
        }

        return await query.ToListAsync();
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