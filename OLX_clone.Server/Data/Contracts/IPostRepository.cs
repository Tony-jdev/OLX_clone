using OLX_clone.Server.Models;

namespace OLX_clone.Server.Data.Contracts;

public interface IPostRepository: IGenericRepository<Post>
{
    Task<Post> GetPostDetailsBySkuAsync(string sku);
    Task<List<Post>> GetAllByCategoryAsync(int categoryId);
    Task<List<Post>> GetAllDetailedAsync(string searchTerm);
    Task<Post> GetDetailsAsync(int? id);
}