using AutoMapper;
using Microsoft.AspNetCore.Identity;
using OLX_clone.Server.Data;
using OLX_clone.Server.Data.Contracts;
using OLX_clone.Server.Models;
using OLX_clone.Server.Helpers;
using OLX_clone.Server.Models.Dtos.Auth;

namespace OLX_clone.Server.Services.UserService;

public class UserService: IUserService
{
    private readonly ApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IMapper _mapper;
    
    public UserService(ApplicationDbContext context,
        UserManager<ApplicationUser> userManager, IMapper mapper)
    {
        _context = context;
        _userManager = userManager;
        _mapper = mapper;
    }
    
    public async Task<ApiResponse<IEnumerable<IdentityError>>> UpdateUser(UpdateApplicationUserDto applicationUserUpdateApplicationDto)
    {
        var apiResponse = new ApiResponse<IEnumerable<IdentityError>>();
        
        var userFromDb = await _userManager.FindByIdAsync(applicationUserUpdateApplicationDto.Id);
        
        if (userFromDb == null)
            return new ApiResponse<IEnumerable<IdentityError>> { Success = false, Message = "User not found." };
        
        userFromDb = _mapper.Map(applicationUserUpdateApplicationDto, userFromDb);
        
        var result = await _userManager.UpdateAsync(userFromDb);
        
        if (result.Succeeded)
            return new ApiResponse<IEnumerable<IdentityError>> { Success = true, Message = "User updated successfully." };
        
        return new ApiResponse<IEnumerable<IdentityError>> { Data = result.Errors, Success = false, Message = "Error updating user." };
    }
    
    public async Task<ApiResponse<IEnumerable<IdentityError>>> UpdateLastSeen(string userId)
    {
        var userFromDb = await _userManager.FindByIdAsync(userId);
        if (userFromDb == null)
            return new ApiResponse<IEnumerable<IdentityError>> { Success = false, Message = "User not found." };
       
        userFromDb.LastSeenOnline = DateTime.Now;
        var result = await _userManager.UpdateAsync(userFromDb);
        
        if (result.Succeeded)
            return new ApiResponse<IEnumerable<IdentityError>> { Success = true, Message = "User updated successfully." };
        
        return new ApiResponse<IEnumerable<IdentityError>> { Data = result.Errors, Success = false, Message = "Error updating user." };
    }

    public async Task<ApiResponse<IEnumerable<IdentityError>>> UpdateOnlineStatus(string userId)
    {
        var userFromDb = await _userManager.FindByIdAsync(userId);
        if (userFromDb == null)
            return new ApiResponse<IEnumerable<IdentityError>> { Success = false, Message = "User not found." };
        
        userFromDb.Online = !userFromDb.Online;
        var result = await _userManager.UpdateAsync(userFromDb);
        
        if (result.Succeeded)
            return new ApiResponse<IEnumerable<IdentityError>> { Success = true, Message = "User's status updated successfully." };
        
        return new ApiResponse<IEnumerable<IdentityError>> { Data = result.Errors, Success = false, Message = "Error updating user." };
    }
}