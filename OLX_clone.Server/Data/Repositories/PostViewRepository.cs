using Microsoft.EntityFrameworkCore;
using OLX_clone.Server.Data.Contracts;
using OLX_clone.Server.Data.Repositories.GenericRepositor;
using OLX_clone.Server.Models;

namespace OLX_clone.Server.Data.Repositories;

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