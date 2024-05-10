﻿using AutoMapper;
using OLX_clone.Server.Data.Contracts;
using OLX_clone.Server.Helpers;
using OLX_clone.Server.Models;
using OLX_clone.Server.Models.Dtos.BoostPackage;

namespace OLX_clone.Server.Services.BoostService;

public class BoostPackageService: IBoostPackageService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IBoostService _boostService;
    private readonly IMapper _mapper;
    
    public BoostPackageService(IUnitOfWork unitOfWork, IMapper mapper, IBoostService boostService)
    {
        _unitOfWork = unitOfWork;
        _boostService = boostService;
        _mapper = mapper;
    }
    
    public async Task<ApiResponse<bool>> BuyBoostPackage(string userId, int postId, int boostPackageId)
    {
        var boostPackage = await _unitOfWork.BoostPackageRepository.GetAsync(boostPackageId);
        if (boostPackage == null)
        {
            return new ApiResponse<bool> { Success = false, Message = "Boost package not found." };
        }

        /*// Перевірка чи користувач має достатньо коштів
        var user = await _userService.GetUserById(userId);
        if (user.Balance < boostPackage.Price)
        {
            return new ApiResponse<bool> { Success = false, Message = "Insufficient balance." };
        }

        // Здійснення оплати
        user.Balance -= boostPackage.Price;
        await _userService.UpdateUser(user);*/

        // Додавання пакету просування користувачеві для конкретного поста
        var result = await _boostService.CreatePostBoost(postId, boostPackage);

        if (result.Success)
        {
            return new ApiResponse<bool> { Success = true, Message = "Boost package bought successfully." };
        }
        else
        {
            /*// Повернення грошей користувачу у разі невдачі
            user.Balance += boostPackage.Price;
            await _userService.UpdateUser(user);*/
            return new ApiResponse<bool> { Success = false, Message = "Failed to buy boost package." };
        }
    }
    
    public async Task<ApiResponse<List<BoostPackage>>> GetBoostPackages()
    {
        var boostPackages = await _unitOfWork.BoostPackageRepository.GetAllAsync();

        return new ApiResponse<List<BoostPackage>> { Data = boostPackages
            , Message = "Packages retrieved successfully." };
    }
    
    public async Task<ApiResponse<BoostPackage>> GetBoostPackage(int id)
    {
        var boostPackage = await _unitOfWork.BoostPackageRepository.GetAsync(id);
        
        return boostPackage == null ? new ApiResponse<BoostPackage> { Success = false, Message = "Package not found." } 
            : new ApiResponse<BoostPackage> { Data = _mapper.Map<BoostPackage>(boostPackage),
                Message = "Package retrieved successfully." };
    }
    
    public async Task<ApiResponse<BoostPackage>> CreateBoostPackage(CreateBoostPackageDto boostPackageCreateDto)
    {
        var boostPackageToCreate = _mapper.Map<CreateBoostPackageDto, BoostPackage>(boostPackageCreateDto);
        
        var createdBoostPackage = await _unitOfWork.BoostPackageRepository.AddAsync(boostPackageToCreate);

        return new ApiResponse<BoostPackage> { Data = createdBoostPackage, Message = "Package created successfully" };
    }
    
    public async Task<ApiResponse<BoostPackage>> UpdateBoostPackage(int id, UpdateBoostPackageDto boostPackageUpdateDto)
    {
        BoostPackage boostPackageFromDb = await _unitOfWork.BoostPackageRepository.GetAsync(id);
        if (boostPackageFromDb == null)
            return new ApiResponse<BoostPackage> { Success = false, Message = "Package not found." };

        boostPackageFromDb = _mapper.Map(boostPackageUpdateDto, boostPackageFromDb);

        var updatedBoostPackage = await _unitOfWork.BoostPackageRepository.UpdateAsync(boostPackageFromDb);

        return new ApiResponse<BoostPackage> { Data = updatedBoostPackage, Message = "Package updated successfully" };
    }
    
    public async Task<ApiResponse<bool>> DeleteBoostPackage(int id)
    {
        BoostPackage boostPackageFromDb = await _unitOfWork.BoostPackageRepository.GetAsync(id);
        if (boostPackageFromDb == null)
            return new ApiResponse<bool> { Success = false, Message = "Package not found." };

        var deletedBootPackage = await _unitOfWork.BoostPackageRepository.DeleteAsync(id);

        return !deletedBootPackage ? new ApiResponse<bool> { Success = false, Message = "Error occured while deleting package." } 
            : new ApiResponse<bool> { Message = "Package deleted successfully" };
    }
}