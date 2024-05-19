using OLX_clone.Server.Models;

namespace OLX_clone.Server.Data.Contracts;

public interface IPostRepository: IGenericRepository<Post>
{
    Task<List<Post>> GetVipPostsAsync();
    Task<Post> GetPostDetailsBySkuAsync(string sku);
    Task<List<Post>> GetAllByCategoryAsync(List<int> categoryIds, string? searchTerm, string? orderBy);
    Task<List<Post>> GetAllAsync(string? searchTerm, string? orderBy);
}