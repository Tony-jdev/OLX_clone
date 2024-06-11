using AutoMapper;
using OLX_clone.BusinessLogicLayer.Middleware.Exceptions;
using OLX_clone.BusinessLogicLayer.Services.Contracts;
using OLX_clone.DataAccessLayer.Helpers;
using OLX_clone.DataAccessLayer.Models;
using OLX_clone.DataAccessLayer.Repositories.Contracts;

namespace OLX_clone.BusinessLogicLayer.Services;

public class BoostService : IBoostService
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

        postToUpdate.IsTop = true;

        if (boostPackage.Type == BoostType.VIP)
        {
            postToUpdate.IsVip = true;
            postBoost.VipExpiryDate = DateTime.Now.AddDays(boostPackage.VipDurationInDays);
        }

        await _unitOfWork.PostRepository.UpdateAsync(postToUpdate);

        var createdPostBoost = await _unitOfWork.PostBoostRepository.AddAsync(postBoost);

        return new ApiResponse<PostBoost>
        {
            Data = createdPostBoost,
            Success = true,
            Message = "Post boost created successfully."
        };
    }

    public async Task<ApiResponse<bool>> BoostPost(int postId)
    {
        var postBoost = await _unitOfWork.PostBoostRepository.GetPostBoostByPostId(postId);
        if (postBoost == null)
        {
            throw new NotFoundException("Post boost not found.");
        }

        if (postBoost.AvailableBoostsCount <= 0)
        {
            await _unitOfWork.PostBoostRepository.DeleteAsync(postBoost.Id);
            return new ApiResponse<bool> { Success = false, Message = "No boosts left for this post." };
        }

        if (postBoost.TopExpiryDate < DateTime.Now)
        {
            postBoost.TopExpiryDate = DateTime.Now.AddDays(postBoost.NumberOfDays);
        }
        else
        {
            postBoost.TopExpiryDate = postBoost.TopExpiryDate.Value.AddDays(postBoost.NumberOfDays);
        }

        postBoost.AvailableBoostsCount--;

        await _unitOfWork.PostBoostRepository.UpdateAsync(postBoost);

        var post = await _unitOfWork.PostRepository.GetAsync(postId);
        if (post == null)
        {
            throw new NotFoundException("Post not found.");
        }

        if (!post.IsTop)
        {
            post.IsTop = true;
            await _unitOfWork.PostRepository.UpdateAsync(post);
        }

        return new ApiResponse<bool> { Success = true, Message = "Post boosted successfully." };
    }
}