using OLX_clone.Server.Models;

namespace OLX_clone.Server.Data.Contracts;

public interface IPostRepository: IGenericRepository<Post>
{
    Task<Post> GetPostDetailsBySkuAsync(string sku);
    Task<List<Post>> GetAllByCategoryAsync(string categorySku, string? searchTerm);
    Task<List<Post>> GetAllAsync(string searchTerm);
    Task<Post> GetDetailsAsync(int? id);
}