using Microsoft.EntityFrameworkCore;
using OLX_clone.DataAccessLayer.Models;
using OLX_clone.DataAccessLayer.Repositories.Contracts;

namespace OLX_clone.DataAccessLayer.Repositories;

public class PostBoostRepository: GenericRepository<PostBoost>, IPostBoostRepository
{
    public PostBoostRepository(ApplicationDbContext context) : base(context)
    {
      
    }
    
    public async Task<PostBoost> GetPostBoostByPostId(int postId)
    {
        return await _context.PostBoosts.Where(pb => pb.PostId == postId).FirstOrDefaultAsync();
    }
    
    public async Task<List<PostBoost>> GetExpiredBoostsAsync()
    {
        return await _context.PostBoosts
            .Where(b => b.TopExpiryDate != null && b.TopExpiryDate <= DateTime.Now || b.VipExpiryDate != null && b.VipExpiryDate <= DateTime.Now)
            .ToListAsync();
    }
}