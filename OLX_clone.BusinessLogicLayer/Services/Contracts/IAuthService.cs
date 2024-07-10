using Microsoft.AspNetCore.Identity;
using OLX_clone.DataAccessLayer.Helpers;
using OLX_clone.DataAccessLayer.Models.Dtos.Auth;

namespace OLX_clone.BusinessLogicLayer.Services.Contracts;

public interface IAuthService
{
    Task<ApiResponse<IEnumerable<IdentityError>>> Register(RegisterRequestDto registerRequestDto);
    Task<ApiResponse<LoginResponseDto>> Login(LoginRequestDto loginRequestDto);
    Task<ApiResponse<string>> ForgotPassword(string email);
    Task<ApiResponse<string>> ResetPassword(string userId, string token, string newPassword);
}