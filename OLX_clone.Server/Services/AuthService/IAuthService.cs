using OLX_clone.Server.Helpers;
using OLX_clone.Server.Models.Dtos.Auth;

namespace OLX_clone.Server.Services.AuthService;

public interface IAuthService
{
    Task<ApiResponse<bool>> Register(RegisterRequestDto registerRequestDto);
    Task<ApiResponse<LoginResponseDto>> Login(LoginRequestDto loginRequestDto);
}