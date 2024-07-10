using OLX_clone.DataAccessLayer.Models;

namespace OLX_clone.DataAccessLayer.Repositories.Contracts;

public interface IPostRepository: IGenericRepository<Post>
{
    Task<List<Post>> GetVipPostsAsync(int number);
    Task<List<Post>> GetPostsByUserIdAsync(string userId);
    Task<List<Post>> GetPostsByStatusAsync(string status);
    Task<List<Post>> GetRecentlySoldPosts(int number);
    Task<Post> GetPostDetailsBySkuAsync(string sku);
    Task<List<Post>> GetAllByCategoryAsync(
        List<int> categoryIds, string? searchTerm, string? orderBy, string? location, string? type,
        double? priceFrom, double? priceTo, string? status);
    Task<List<Post>> GetAllAsync(string? searchTerm, string? orderBy, string? location, string? type,
        double? priceFrom, double? priceTo, string? status);
}