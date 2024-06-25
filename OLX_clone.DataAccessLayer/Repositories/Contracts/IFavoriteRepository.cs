using OLX_clone.DataAccessLayer.Models;

namespace OLX_clone.DataAccessLayer.Repositories.Contracts;

public interface IFavoriteRepository : IGenericRepository<Favorite>
{
    Task<List<Favorite>> GetFavoritesByUserIdAsync(string userId);
}