using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using OLX_clone.DataAccessLayer.Helpers;
using OLX_clone.DataAccessLayer.Models;
using OLX_clone.DataAccessLayer.Models.Dtos.User;

namespace OLX_clone.BusinessLogicLayer.Services.Contracts;

public interface IUserService
{
    Task<ApiResponse<GetApplicationUserDetailsDto>> GetUserProfile(string userId);
    Task<ApiResponse<GetApplicationUserChatDto>> GetUserById(string userId);
    Task<ApiResponse<bool>> ChangePassword(ChangePasswordDto model);
    Task<ApiResponse<IEnumerable<IdentityError>>> UpdateUser(UpdateApplicationUserDto applicationUserUpdateDto);
    Task<ApiResponse<IEnumerable<IdentityError>>> UpdateUserAdditional(
        UpdateApplicationUserAdditionalDto applicationUserUpdateAdditionalDto);
    Task<ApiResponse<string>> UploadUserPhoto(string userId, IFormFile file);
    Task<ApiResponse<IEnumerable<IdentityError>>> UpdateBalance(Transaction transaction);
    Task<ApiResponse<IEnumerable<IdentityError>>> UpdateOnlineStatus(string userId);
}