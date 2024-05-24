using OLX_clone.Server.Helpers;
using OLX_clone.Server.Models;

namespace OLX_clone.Server.Services.BoostService;

public interface IBoostService
{
    Task<ApiResponse<PostBoost>> CreatePostBoost(int postId, BoostPackage boostPackage);
    Task<ApiResponse<bool>> BoostPost(int postId);
}