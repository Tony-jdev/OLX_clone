using Microsoft.EntityFrameworkCore;
using OLX_clone.Server.Data.Contracts;
using OLX_clone.Server.Models;

namespace OLX_clone.Server.Data.Repositories;

public class PostBoostRepository: GenericRepository<PostBoost>, IPostBoostRepository
{
    public PostBoostRepository(ApplicationDbContext context) : base(context)
    {
      
    }
    
    public async Task<PostBoost> GetPostBoostByPostId(int postId)
    {
        return await _context.PostBoosts.Where(pb => pb.PostId == postId).FirstOrDefaultAsync();
    }
}