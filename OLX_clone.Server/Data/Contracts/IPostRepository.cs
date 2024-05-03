using OLX_clone.Server.Models;

namespace OLX_clone.Server.Data.Contracts;

public interface IPostRepository: IGenericRepository<Post>
{
    Task<Post> GetPostDetailsBySkuAsync(string sku);
    Task<List<Post>> GetAllByCategoryAsync(string categorySku, string? searchTerm, string? orderBy);
    Task<List<Post>> GetAllAsync(string? searchTerm, string? orderBy);
    Task<Post> GetDetailsAsync(int? id);
}