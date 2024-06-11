using OLX_clone.DataAccessLayer.Helpers;
using OLX_clone.DataAccessLayer.Models;

namespace OLX_clone.BusinessLogicLayer.Services.Contracts;

public interface IBoostService
{
    Task<ApiResponse<PostBoost>> CreatePostBoost(int postId, BoostPackage boostPackage);
    Task<ApiResponse<bool>> BoostPost(int postId);
}