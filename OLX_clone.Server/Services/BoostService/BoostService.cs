using AutoMapper;
using OLX_clone.Server.Data.Contracts;
using OLX_clone.Server.Helpers;
using OLX_clone.Server.Models;

namespace OLX_clone.Server.Services.BoostService;

public class BoostService: IBoostService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    
    public BoostService(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }
    
    public async Task<ApiResponse<PostBoost>> CreatePostBoost(int postId, BoostPackage boostPackage)
    {
        var postBoost = new PostBoost()
        {
            PostId = postId,
            AvailableBoostsCount = boostPackage.BoostCount,
            TopExpiryDate = DateTime.Now.AddDays(boostPackage.TopDurationInDays),
        };

        // Оновити поле IsTop у пості
        var postToUpdate = await _unitOfWork.PostRepository.GetAsync(postId);
        if (postToUpdate != null)
        {
            postToUpdate.IsTop = true;
            
            if(boostPackage.Type == BoostType.VIP)
                postToUpdate.IsVip = true;
            
            await _unitOfWork.PostRepository.UpdateAsync(postToUpdate);
        }
        else
        {
            return new ApiResponse<PostBoost> { Success = false, Message = "Post not found" };
        }
        
        // Якщо це VIP-пакет, то додати дату закінчення VIP-просування
        if (boostPackage.Type == BoostType.VIP)
        {
            postBoost.VipExpiryDate = DateTime.Now.AddDays(boostPackage.VipDurationInDays);
        }

        // Додати запис про просування в базу даних
        var createdPostBoost = await _unitOfWork.PostBoostRepository.AddAsync(postBoost);

        return new ApiResponse<PostBoost> { Data = createdPostBoost, Message = "Post boost created successfully" };
    }

    
    /*public async Task<ApiResponse<bool>> BoostPost(int postId, int boostPackageId)
    {
        try
        {
            // Отримати інформацію про оголошення та пакет просування
            var post = await _unitOfWork.PostRepository.GetAsync(postId);
            var boostPackage = await _unitOfWork.BoostPackageRepository.GetAsync(boostPackageId);

            if (post == null || boostPackage == null)
            {
                return new ApiResponse<bool> { Success = false, Message = "Post or boost package not found." };
            }

            // Перевірити, чи користувач має достатньо підйомів для виконання операції
            if (post.AvailableBoostsCount < boostPackage.BoostCount)
            {
                return new ApiResponse<bool> { Success = false, Message = "Not enough boosts available." };
            }

            // Оновити баланс користувача
            post.AvailableBoostsCount -= boostPackage.BoostCount;

            // Додати запис в таблицю просування
            var boost = new Boost
            {
                ApplicationUserId = post.ApplicationUserId,
                PostId = postId,
                BoostPackageId = boostPackageId,
                ExpirationDate = DateTime.Now.AddDays(boostPackage.DurationInDays)
            };

            await _unitOfWork.BoostRepository.AddAsync(boost);
            await _unitOfWork.SaveChangesAsync();

            return new ApiResponse<bool> { Success = true, Message = "Post boosted successfully." };
        }
        catch (Exception ex)
        {
            return new ApiResponse<bool> { Success = false, Message = $"Error boosting post: {ex.Message}" };
        }
    }*/
}