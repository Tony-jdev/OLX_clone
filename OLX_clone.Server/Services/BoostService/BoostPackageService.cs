using AutoMapper;
using OLX_clone.Server.Data.Contracts;
using OLX_clone.Server.Helpers;
using OLX_clone.Server.Models;
using OLX_clone.Server.Models.Dtos;
using OLX_clone.Server.Models.Dtos.BoostPackage;
using OLX_clone.Server.Services.UserService;

namespace OLX_clone.Server.Services.BoostService;

public class BoostPackageService: IBoostPackageService
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
            return new ApiResponse<bool> { Success = false, Message = "Boost package not found." };
        }
        
        var response = await _userService.UpdateBalance(
            new Transaction{Amount = boostPackage.Price, UserId = userId, Type = TransactionType.AdvertisementPayment});
        if (!response.Success)
            return new ApiResponse<bool> { Success = false, Message = response.Message };;
        
        var result = await _boostService.CreatePostBoost(postId, boostPackage);

        if (!result.Success)
        {
            return new ApiResponse<bool> { Success = false, Message = "Failed to buy boost package." };
        }
        
        return new ApiResponse<bool> { Success = true, Message = "Boost package bought successfully." };
    }
    
    public async Task<ApiResponse<List<GetBoostPackageDto>>> GetBoostPackages()
    {
        var boostPackages = await _unitOfWork.BoostPackageRepository.GetAllAsync();

        return new ApiResponse<List<GetBoostPackageDto>> { Data = _mapper.Map<List<GetBoostPackageDto>>(boostPackages)
            , Message = "Packages retrieved successfully." };
    }
    
    public async Task<ApiResponse<GetBoostPackageDetailsDto>> GetBoostPackage(int id)
    {
        var boostPackage = await _unitOfWork.BoostPackageRepository.GetAsync(id);
        
        return boostPackage == null ? new ApiResponse<GetBoostPackageDetailsDto> { Success = false, Message = "Package not found." } 
            : new ApiResponse<GetBoostPackageDetailsDto> { Data = _mapper.Map<GetBoostPackageDetailsDto>(boostPackage),
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