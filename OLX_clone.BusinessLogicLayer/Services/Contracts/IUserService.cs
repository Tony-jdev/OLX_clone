using Microsoft.AspNetCore.Identity;
using OLX_clone.DataAccessLayer.Helpers;
using OLX_clone.DataAccessLayer.Models;
using OLX_clone.DataAccessLayer.Models.Dtos.User;

namespace OLX_clone.BusinessLogicLayer.Services.Contracts;

public interface IUserService
{
    Task<ApiResponse<GetApplicationUserDetailsDto>> GetUserProfile(string userId);
    Task<ApiResponse<IEnumerable<IdentityError>>> UpdateUser(UpdateApplicationUserDto applicationUserUpdateApplicationDto);
    Task<ApiResponse<IEnumerable<IdentityError>>> UpdateBalance(Transaction transaction);
    Task<ApiResponse<IEnumerable<IdentityError>>> UpdateLastSeen(string userId);
    Task<ApiResponse<IEnumerable<IdentityError>>> UpdateOnlineStatus(string userId);
}