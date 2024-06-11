using OLX_clone.DataAccessLayer.Models;

namespace OLX_clone.DataAccessLayer.Repositories.Contracts;

public interface IPostBoostRepository: IGenericRepository<PostBoost>
{
    Task<PostBoost> GetPostBoostByPostId(int postId);
    Task<List<PostBoost>> GetExpiredBoostsAsync();
}