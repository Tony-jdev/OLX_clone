using OLX_clone.DataAccessLayer.Models;

namespace OLX_clone.DataAccessLayer.Repositories.Contracts;

public interface IFavoriteRepository : IGenericRepository<Favorite>
{
    Task<bool> ExistsAsync(string userId, int postId);
    Task<List<Favorite>> GetFavoritesByUserIdAsync(string userId);
    Task<int> GetFavoritesCountByPostId(int postId);
}