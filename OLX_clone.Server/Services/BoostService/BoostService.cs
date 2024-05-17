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
        var postBoostFromDb = await _unitOfWork.PostBoostRepository.GetPostBoostByPostId(postId);
        if (postBoostFromDb != null)
        {
            await _unitOfWork.PostBoostRepository.DeleteAsync(postBoostFromDb.Id);
        }
        
        var postBoost = new PostBoost()
        {
            PostId = postId,
            NumberOfDays = boostPackage.NumberOfDays,
            AvailableBoostsCount = boostPackage.BoostCount,
            TopExpiryDate = DateTime.Now.AddDays(boostPackage.TopDurationInDays),
        };
        
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
        
        if (boostPackage.Type == BoostType.VIP)
        {
            postBoost.VipExpiryDate = DateTime.Now.AddDays(boostPackage.VipDurationInDays);
        }
        
        var createdPostBoost = await _unitOfWork.PostBoostRepository.AddAsync(postBoost);

        return new ApiResponse<PostBoost> { Data = createdPostBoost, Message = "Post boost created successfully" };
    }

    
    public async Task<ApiResponse<bool>> BoostPost(int postId)
    {
        try
        {
            var postBoost = await _unitOfWork.PostBoostRepository.GetPostBoostByPostId(postId);
            
            if (postBoost.AvailableBoostsCount <= 0)
            {
                await _unitOfWork.PostBoostRepository.DeleteAsync(postBoost.Id);
                return new ApiResponse<bool> { Success = false, Message = "No boosts left for this post." };
            }

            if(postBoost.TopExpiryDate < DateTime.Now)
                postBoost.TopExpiryDate = DateTime.Now.AddDays(postBoost.NumberOfDays);
            else postBoost.TopExpiryDate = postBoost.TopExpiryDate.Value.AddDays(postBoost.NumberOfDays);
            
            postBoost.AvailableBoostsCount--;
            
            await _unitOfWork.PostBoostRepository.UpdateAsync(postBoost);
            
            var post = await _unitOfWork.PostRepository.GetAsync(postId);
            
            if (!post.IsTop)
            {
                post.IsTop = true;
                await _unitOfWork.PostRepository.UpdateAsync(post);
            }

            return new ApiResponse<bool> { Success = true, Message = "Post boosted successfully." };
        }
        catch (Exception ex)
        {
            return new ApiResponse<bool> { Success = false, Message = $"Error boosting post: {ex.Message}" };
        }
    }
}