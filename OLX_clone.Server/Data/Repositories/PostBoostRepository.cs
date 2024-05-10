using OLX_clone.Server.Data.Contracts;
using OLX_clone.Server.Models;

namespace OLX_clone.Server.Data.Repositories;

public class PostBoostRepository: GenericRepository<PostBoost>, IPostBoostRepository
{
    public PostBoostRepository(ApplicationDbContext context) : base(context)
    {
      
    }
}