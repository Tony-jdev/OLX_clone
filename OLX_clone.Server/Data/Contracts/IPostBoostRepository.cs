using OLX_clone.Server.Models;

namespace OLX_clone.Server.Data.Contracts;

public interface IPostBoostRepository: IGenericRepository<PostBoost>
{
    Task<PostBoost> GetPostBoostByPostId(int postId);
    Task<List<PostBoost>> GetExpiredBoostsAsync();
}