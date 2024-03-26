using OLX_clone.Server.Models;

namespace OLX_clone.Server.Data.Contracts;

public interface IPostViewRepository: IGenericRepository<PostView>
{
    Task<int> GetAllPostViewsCountByPostId(int postId);
}