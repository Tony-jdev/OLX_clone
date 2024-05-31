using AutoMapper;
using Microsoft.AspNetCore.Identity;
using OLX_clone.Server.Data;
using OLX_clone.Server.Data.Contracts;
using OLX_clone.Server.Models;
using OLX_clone.Server.Helpers;
using OLX_clone.Server.Middleware.Exceptions;
using OLX_clone.Server.Models.Dtos.Auth;
using OLX_clone.Server.Models.Dtos.User;
using OLX_clone.Server.Services.PostService;
using OLX_clone.Server.Services.TransactionService;

namespace OLX_clone.Server.Services.UserService;

public class UserService : IUserService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ITransactionService _transactionService;
    private readonly IPostService _postService;
    private readonly IMapper _mapper;

    public UserService(UserManager<ApplicationUser> userManager, IMapper mapper, ITransactionService transactionService,
        IPostService postService)
    {
        _userManager = userManager;
        _mapper = mapper;
        _transactionService = transactionService;
        _postService = postService;
    }

    public async Task<ApiResponse<GetApplicationUserDetailsDto>> GetUserProfile(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            throw new NotFoundException("User not found.");
        }

        var userPosts = await _postService.GetPostsByUser(userId);

        var userProfile = new GetApplicationUserDetailsDto
        {
            UserId = user.Id,
            Name = user.Name,
            Surname = user.Surname,
            PhoneNumber = user.PhoneNumber,
            Posts = userPosts
        };

        return new ApiResponse<GetApplicationUserDetailsDto>
        {
            Data = userProfile,
            Success = true,
            Message = "User profile retrieved successfully."
        };
    }

    public async Task<ApiResponse<IEnumerable<IdentityError>>> UpdateUser(UpdateApplicationUserDto applicationUserUpdateApplicationDto)
    {
        var userFromDb = await _userManager.FindByIdAsync(applicationUserUpdateApplicationDto.Id);
        if (userFromDb == null)
        {
            throw new NotFoundException("User not found.");
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

    public async Task<ApiResponse<IEnumerable<IdentityError>>> UpdateLastSeen(string userId)
    {
        var userFromDb = await _userManager.FindByIdAsync(userId);
        if (userFromDb == null)
        {
            throw new NotFoundException("User not found.");
        }

        userFromDb.LastSeenOnline = DateTime.Now;
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

    public async Task<ApiResponse<IEnumerable<IdentityError>>> UpdateOnlineStatus(string userId)
    {
        var userFromDb = await _userManager.FindByIdAsync(userId);
        if (userFromDb == null)
        {
            throw new NotFoundException("User not found.");
        }

        userFromDb.Online = !userFromDb.Online;
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