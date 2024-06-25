using OLX_clone.DataAccessLayer.Helpers;
using OLX_clone.DataAccessLayer.Models;
using OLX_clone.DataAccessLayer.Models.Dtos.Favorite;

namespace OLX_clone.BusinessLogicLayer.Services.Contracts;

public interface IFavoriteService
{
    Task<ApiResponse<List<GetFavoriteDto>>> GetFavoritesByUserIdAsync(string userId);
    Task<ApiResponse<Favorite>> AddFavoriteAsync(AddFavoriteDto favoriteAddDto);
    Task<ApiResponse<bool>> RemoveFavoriteAsync(int Id);
}