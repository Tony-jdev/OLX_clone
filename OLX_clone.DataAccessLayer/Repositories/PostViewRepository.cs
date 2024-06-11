using Microsoft.EntityFrameworkCore;
using OLX_clone.DataAccessLayer.Models;
using OLX_clone.DataAccessLayer.Repositories.Contracts;

namespace OLX_clone.DataAccessLayer.Repositories;

public class PostViewRepository: GenericRepository<PostView>, IPostViewRepository
{
    public PostViewRepository(ApplicationDbContext context) : base(context)
    {
      
    }

    public async Task<int> GetAllPostViewsCountByPostId(int postId)
    {
        return await _context.PostViews.Where(pw => pw.PostId == postId).CountAsync();
    }
}