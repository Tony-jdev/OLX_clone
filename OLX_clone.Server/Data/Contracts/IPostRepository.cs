using OLX_clone.Server.Models;

namespace OLX_clone.Server.Data.Contracts;

public interface IPostRepository: IGenericRepository<Post>
{
    Task<List<Post>> GetAllDetailedAsync();
    Task<Post> GetDetailsAsync(int? id);
}