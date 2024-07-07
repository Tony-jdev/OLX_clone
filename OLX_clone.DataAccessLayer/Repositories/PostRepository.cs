using Microsoft.EntityFrameworkCore;
using OLX_clone.DataAccessLayer.Helpers;
using OLX_clone.DataAccessLayer.Models;
using OLX_clone.DataAccessLayer.Models.Enums;
using OLX_clone.DataAccessLayer.Repositories.Contracts;

namespace OLX_clone.DataAccessLayer.Repositories;

public class PostRepository : GenericRepository<Post>, IPostRepository
{
    public PostRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<List<Post>> GetVipPostsAsync(int number)
    {
        return await _context.Posts
            .Where(p => p.IsVip && p.Status == PostStatus.Active)
            .OrderBy(p => Guid.NewGuid())
            .Take(number)
            .ToListAsync();
    }

    public async Task<List<Post>> GetPostsByUserIdAsync(string userId)
    {
        return await _context.Posts
            .Where(p => p.ApplicationUserId == userId)
            .ToListAsync();
    }

    public async Task<List<Post>> GetAllAsync(string? searchTerm, string? orderBy, string? location, string? type, double? priceFrom, double? priceTo,
        string? status)
    {
        var query = BuildQuery(null, searchTerm, orderBy, location, type, priceFrom, priceTo, status);
        return await ExecuteQueryAsync(query, orderBy);
    }

    public async Task<List<Post>> GetAllByCategoryAsync(
        List<int> categoryIds, string? searchTerm, string? orderBy, string? location, string? type, double? priceFrom, double? priceTo,
        string? status)
    {
        var query = BuildQuery(categoryIds, searchTerm, orderBy, location, type, priceFrom, priceTo, status);
        return await ExecuteQueryAsync(query, orderBy);
    }

    public async Task<List<Post>> GetRecentlySoldPosts(int number)
    {
        return await _context.Posts
            .Where(p => p.Status == PostStatus.Sold)
            .OrderByDescending(p => p.SoldAt)
            .Take(number)
            .ToListAsync();
    }

    public async Task<Post> GetPostDetailsBySkuAsync(string sku)
    {
        return await _context.Posts
            .Include(p => p.User)
            .Include(p => p.Category)
            .FirstOrDefaultAsync(p => p.SKU == sku);
    }

    private IQueryable<Post> BuildQuery(
        List<int>? categoryIds, string? searchTerm, string? orderBy, string? location, string? type, double? priceFrom, double? priceTo,
        string? status)
    {
        IQueryable<Post> query = _context.Posts;

        if (categoryIds != null && categoryIds.Any())
        {
            query = query.Where(p => categoryIds.Contains(p.CategoryId));
        }

        if (!string.IsNullOrEmpty(status))
        {
            // Assuming status is a valid enum name string, parse it to the enum type
            var statusEnum = Enum.Parse<PostStatus>(status, true);
            query = query.Where(p => p.Status == statusEnum);
        }else
        {
            query = query.Where(p => p.Status == PostStatus.Active);
        }

        if (!string.IsNullOrEmpty(searchTerm))
        {
            query = query.Where(p => p.Title.ToLower().Contains(searchTerm.ToLower()));
        }

        if (!string.IsNullOrEmpty(location))
        {
            query = query.Where(p => p.Location.ToLower().Contains(location.ToLower()));
        }
        
        if (!string.IsNullOrEmpty(type))
        {
            var typeEnum = Enum.Parse<PostType>(type, true);
            query = query.Where(p => p.Type == typeEnum);
        }

        if (priceFrom.HasValue)
        {
            query = query.Where(p => p.Price >= priceFrom.Value);
        }

        if (priceTo.HasValue)
        {
            query = query.Where(p => p.Price <= priceTo.Value);
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
                    query = query.OrderBy(p => Guid.NewGuid());
                    break;
            }
        }
        else query = query.OrderBy(p => Guid.NewGuid());

        return query;
    }


    private async Task<List<Post>> ExecuteQueryAsync(IQueryable<Post> query, string? orderBy)
    {
        if (!string.IsNullOrEmpty(orderBy))
            return await query.ToListAsync();

        var topPosts = await query.Where(p => p.IsTop)
                                  .Take(4)
                                  .ToListAsync();

        var topPostIds = topPosts.Select(p => p.Id).ToList();

        var remainingPosts = await query.Where(p => !topPostIds.Contains(p.Id))
                                        .ToListAsync();

        return topPosts.Concat(remainingPosts).ToList();
    }
}