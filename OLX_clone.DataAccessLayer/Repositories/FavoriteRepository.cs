using Microsoft.EntityFrameworkCore;
using OLX_clone.DataAccessLayer.Models;
using OLX_clone.DataAccessLayer.Repositories.Contracts;

namespace OLX_clone.DataAccessLayer.Repositories;

public class FavoriteRepository : GenericRepository<Favorite>, IFavoriteRepository
{
    public FavoriteRepository(ApplicationDbContext context) : base(context)
    {
      
    }
    
    public async Task<List<Favorite>> GetFavoritesByUserIdAsync(string userId)
    {
        return await _context.Favorites
            .Where(f => f.ApplicationUserId == userId)
            .Include(f => f.Post)
            .OrderByDescending(f => f.CreatedAt)
            .ToListAsync();
    }
    
    public async Task<int> GetFavoritesCountByPostId(int postId)
    {
        return _context.Favorites
            .Where(f => f.PostId == postId)
            .Count();
    }
}