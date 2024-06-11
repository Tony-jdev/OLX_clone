using OLX_clone.DataAccessLayer.Models;

namespace OLX_clone.DataAccessLayer.Repositories.Contracts;

public interface IPostViewRepository: IGenericRepository<PostView>
{
    Task<int> GetAllPostViewsCountByPostId(int postId);
}