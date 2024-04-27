using Microsoft.AspNetCore.Identity;
using OLX_clone.Server.Helpers;
using OLX_clone.Server.Models.Dtos.Auth;

namespace OLX_clone.Server.Services.UserService;

public interface IUserService
{
    Task<ApiResponse<IEnumerable<IdentityError>>> UpdateUser(UpdateApplicationUserDto applicationUserUpdateApplicationDto);
    Task<ApiResponse<IEnumerable<IdentityError>>> UpdateLastSeen(string userId);
    Task<ApiResponse<IEnumerable<IdentityError>>> UpdateOnlineStatus(string userId);
}