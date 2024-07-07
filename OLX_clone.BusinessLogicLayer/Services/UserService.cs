using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OLX_clone.BusinessLogicLayer.Middleware.Exceptions;
using OLX_clone.BusinessLogicLayer.Services.Contracts;
using OLX_clone.DataAccessLayer.Helpers;
using OLX_clone.DataAccessLayer.Models;
using OLX_clone.DataAccessLayer.Models.Dtos.User;

namespace OLX_clone.BusinessLogicLayer.Services;

public class UserService : IUserService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ITransactionService _transactionService;
    private readonly IPostService _postService;
    private readonly IBlobService _blobService;
    private readonly IMapper _mapper;

    public UserService(UserManager<ApplicationUser> userManager, IMapper mapper, ITransactionService transactionService,
        IPostService postService, IBlobService blobService)
    {
        _userManager = userManager;
        _mapper = mapper;
        _transactionService = transactionService;
        _postService = postService;
        _blobService = blobService;
    }

    public async Task<ApiResponse<GetApplicationUserDetailsDto>> GetUserProfile(string userId)
    {
        var userFromDb = await _userManager.FindByIdAsync(userId);
        if (userFromDb == null)
        {
            throw new NotFoundException("User not found.");
        }

        var userToView = _mapper.Map<ApplicationUser, GetApplicationUserDetailsDto>(userFromDb);
        userToView.Posts = await _postService.GetPostsByUser(userId);

        return new ApiResponse<GetApplicationUserDetailsDto>
        {
            Data = userToView,
            Success = true,
            Message = "User profile retrieved successfully."
        };
    }
    
    public async Task<ApiResponse<bool>> ChangePassword(ChangePasswordDto model)
    {
        var user = await _userManager.FindByIdAsync(model.UserId);
        if (user == null)
        {
            throw new NotFoundException("User not found.");
        }

        var result = await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);
        if (!result.Succeeded)
        {
            var errors = string.Join(", ", result.Errors.Select(e => e.Description));
            throw new BadRequestException($"Password change failed: {errors}");
        }

        return new ApiResponse<bool> { Success = true, Message = "Password changed successfully", Data = true };
    }

    public async Task<ApiResponse<IEnumerable<IdentityError>>> UpdateUser(UpdateApplicationUserDto applicationUserUpdateApplicationDto)
    {
        var userFromDb = await _userManager.FindByIdAsync(applicationUserUpdateApplicationDto.Id);
        if (userFromDb == null)
        {
            throw new NotFoundException("User not found.");
        }
    
        // Перевірка унікальності номера телефону
        var phoneNumberUsed = await _userManager.Users
            .AnyAsync(u => u.PhoneNumber == applicationUserUpdateApplicationDto.PhoneNumber && u.Id != applicationUserUpdateApplicationDto.Id);
        if (phoneNumberUsed)
        {
            throw new BadRequestException("Phone number already in use by another user.");
        }
        
        userFromDb = _mapper.Map(applicationUserUpdateApplicationDto, userFromDb);

        var result = await _userManager.UpdateAsync(userFromDb);
        if (result.Succeeded)
        {
            return new ApiResponse<IEnumerable<IdentityError>> { Success = true, Message = "User updated successfully." };
        }

        return new ApiResponse<IEnumerable<IdentityError>>
        {
            Data = result.Errors,
            Success = false,
            Message = "Error updating user."
        };
    }
    
    public async Task<ApiResponse<string>> UploadUserPhoto(string userId, IFormFile file)
    {
        ApplicationUser user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            throw new NotFoundException("User not found.");
        }
        
        if (!string.IsNullOrEmpty(user.ProfilePhotoUrl))
        {
            var existingFileName = user.ProfilePhotoUrl.Split('/').Last();
            await _blobService.DeleteBlob(existingFileName, SD.SD_Storage_Container);
        }
        
        var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
        var createdFile = await _blobService.UploadBlob(fileName, SD.SD_Storage_Container, file);
        
        user.ProfilePhotoUrl = createdFile;
        var updateResult = await _userManager.UpdateAsync(user);
        if (!updateResult.Succeeded)
        {
            throw new InternalServerErrorException("Failed to update user profile with new photo.");
        }

        return new ApiResponse<string> { Data = createdFile, Success = true, Message = "Photo uploaded successfully" };
    }

    public async Task<ApiResponse<IEnumerable<IdentityError>>> UpdateOnlineStatus(string userId)
    {
        var userFromDb = await _userManager.FindByIdAsync(userId);
        if (userFromDb == null)
        {
            throw new NotFoundException("User not found.");
        }

        userFromDb.Online = !userFromDb.Online;
        userFromDb.LastSeenOnline = DateTime.Now;
        var result = await _userManager.UpdateAsync(userFromDb);
        if (result.Succeeded)
        {
            return new ApiResponse<IEnumerable<IdentityError>> { Success = true, Message = "User's status updated successfully." };
        }

        return new ApiResponse<IEnumerable<IdentityError>>
        {
            Data = result.Errors,
            Success = false,
            Message = "Error updating user."
        };
    }

    public async Task<ApiResponse<IEnumerable<IdentityError>>> UpdateBalance(Transaction transaction)
    {
        var userFromDb = await _userManager.FindByIdAsync(transaction.UserId);
        if (userFromDb == null)
        { 
            throw new NotFoundException("User not found.");
        }

        if (transaction.Type == TransactionType.AdvertisementPayment && transaction.Amount <= userFromDb.Balance)
        {
            userFromDb.Balance -= transaction.Amount;
        }
        else if (transaction.Type == TransactionType.Deposit)
        {
            userFromDb.Balance += transaction.Amount;
        }
        else
        {
            throw new BadRequestException("Insufficient balance.");
        }

        var transactionResult = await _transactionService.RecordTransaction(transaction);
        if (!transactionResult.Success)
        {
            throw new InternalServerErrorException("Error recording transaction.");
        }

        var result = await _userManager.UpdateAsync(userFromDb);
        if (result.Succeeded)
        {
            return new ApiResponse<IEnumerable<IdentityError>> { Success = true, Message = "User balance updated successfully." };
        }

        return new ApiResponse<IEnumerable<IdentityError>>
        {
            Data = result.Errors,
            Success = false,
            Message = "Error updating user balance."
        };
    }
}