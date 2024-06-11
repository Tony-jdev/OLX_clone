using AutoMapper;
using OLX_clone.BusinessLogicLayer.Middleware.Exceptions;
using OLX_clone.BusinessLogicLayer.Services.Contracts;
using OLX_clone.DataAccessLayer.Helpers;
using OLX_clone.DataAccessLayer.Models;
using OLX_clone.DataAccessLayer.Models.Dtos.BoostPackage;
using OLX_clone.DataAccessLayer.Repositories.Contracts;

namespace OLX_clone.BusinessLogicLayer.Services;

public class BoostPackageService : IBoostPackageService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IBoostService _boostService;
    private readonly IUserService _userService;
    private readonly IMapper _mapper;
    
    public BoostPackageService(IUnitOfWork unitOfWork, IMapper mapper,
        IBoostService boostService, IUserService userService)
    {
        _unitOfWork = unitOfWork;
        _boostService = boostService;
        _userService = userService;
        _mapper = mapper;
    }
    
    public async Task<ApiResponse<bool>> BuyBoostPackage(string userId, int postId, int boostPackageId)
    {
        var boostPackage = await _unitOfWork.BoostPackageRepository.GetAsync(boostPackageId);
        if (boostPackage == null)
        {
            throw new NotFoundException("Boost package not found.");
        }
        
        var response = await _userService.UpdateBalance(
            new Transaction{Amount = boostPackage.Price, UserId = userId, Type = TransactionType.AdvertisementPayment});
        if (!response.Success)
        {
            throw new InternalServerErrorException("Failed to update balance.");
        }
        
        var result = await _boostService.CreatePostBoost(postId, boostPackage);
        if (!result.Success)
        {
            throw new InternalServerErrorException("Failed to buy boost package.");
        }
        
        return new ApiResponse<bool> { Success = true, Message = "Boost package bought successfully." };
    }
    
    public async Task<ApiResponse<List<GetBoostPackageDto>>> GetBoostPackages()
    {
        var boostPackages = await _unitOfWork.BoostPackageRepository.GetAllAsync();
        return new ApiResponse<List<GetBoostPackageDto>>
        {
            Data = _mapper.Map<List<GetBoostPackageDto>>(boostPackages),
            Message = "Packages retrieved successfully."
        };
    }
    
    public async Task<ApiResponse<GetBoostPackageDetailsDto>> GetBoostPackage(int id)
    {
        var boostPackage = await _unitOfWork.BoostPackageRepository.GetAsync(id);
        if (boostPackage == null)
        {
            throw new NotFoundException("Package not found.");
        }

        return new ApiResponse<GetBoostPackageDetailsDto>
        {
            Data = _mapper.Map<GetBoostPackageDetailsDto>(boostPackage),
            Message = "Package retrieved successfully."
        };
    }
    
    public async Task<ApiResponse<BoostPackage>> CreateBoostPackage(CreateBoostPackageDto boostPackageCreateDto)
    {
        var boostPackageToCreate = _mapper.Map<CreateBoostPackageDto, BoostPackage>(boostPackageCreateDto);
        var createdBoostPackage = await _unitOfWork.BoostPackageRepository.AddAsync(boostPackageToCreate);

        if (createdBoostPackage == null)
        {
            throw new InternalServerErrorException("Failed to create the package.");
        }

        return new ApiResponse<BoostPackage>
        {
            Data = createdBoostPackage,
            Message = "Package created successfully."
        };
    }
    
    public async Task<ApiResponse<BoostPackage>> UpdateBoostPackage(int id, UpdateBoostPackageDto boostPackageUpdateDto)
    {
        var boostPackageFromDb = await _unitOfWork.BoostPackageRepository.GetAsync(id);
        if (boostPackageFromDb == null)
        {
            throw new NotFoundException("Package not found.");
        }

        boostPackageFromDb = _mapper.Map(boostPackageUpdateDto, boostPackageFromDb);
        var updatedBoostPackage = await _unitOfWork.BoostPackageRepository.UpdateAsync(boostPackageFromDb);

        if (updatedBoostPackage == null)
        {
            throw new InternalServerErrorException("Failed to update the package.");
        }

        return new ApiResponse<BoostPackage>
        {
            Data = updatedBoostPackage,
            Message = "Package updated successfully."
        };
    }
    
    public async Task<ApiResponse<bool>> DeleteBoostPackage(int id)
    {
        var boostPackageFromDb = await _unitOfWork.BoostPackageRepository.GetAsync(id);
        if (boostPackageFromDb == null)
        {
            throw new NotFoundException("Package not found.");
        }

        var deletedBoostPackage = await _unitOfWork.BoostPackageRepository.DeleteAsync(id);
        if (!deletedBoostPackage)
        {
            throw new InternalServerErrorException("Error occurred while deleting package.");
        }

        return new ApiResponse<bool> { Message = "Package deleted successfully." };
    }
}