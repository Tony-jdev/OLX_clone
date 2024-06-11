using OLX_clone.DataAccessLayer.Helpers;
using OLX_clone.DataAccessLayer.Models;
using OLX_clone.DataAccessLayer.Models.Dtos.BoostPackage;

namespace OLX_clone.BusinessLogicLayer.Services.Contracts;

public interface IBoostPackageService
{
    Task<ApiResponse<List<GetBoostPackageDto>>> GetBoostPackages();
    Task<ApiResponse<GetBoostPackageDetailsDto>> GetBoostPackage(int id);
    Task<ApiResponse<BoostPackage>> CreateBoostPackage(CreateBoostPackageDto boostPackageCreateDto);
    Task<ApiResponse<BoostPackage>> UpdateBoostPackage(int id, UpdateBoostPackageDto boostPackageUpdateDto);
    Task<ApiResponse<bool>> DeleteBoostPackage(int id);
    Task<ApiResponse<bool>> BuyBoostPackage(string userId, int postId, int boostPackageId);
}