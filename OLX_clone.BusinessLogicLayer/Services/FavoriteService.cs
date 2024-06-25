using AutoMapper;
using OLX_clone.BusinessLogicLayer.Middleware.Exceptions;
using OLX_clone.BusinessLogicLayer.Services.Contracts;
using OLX_clone.DataAccessLayer.Helpers;
using OLX_clone.DataAccessLayer.Models;
using OLX_clone.DataAccessLayer.Models.Dtos.Favorite;
using OLX_clone.DataAccessLayer.Repositories.Contracts;

namespace OLX_clone.BusinessLogicLayer.Services;

public class FavoriteService : IFavoriteService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public FavoriteService(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<ApiResponse<List<GetFavoriteDto>>> GetFavoritesByUserIdAsync(string userId)
    {
        var favorites = await _unitOfWork.FavoriteRepository.GetFavoritesByUserIdAsync(userId);
        var favoriteDtos = _mapper.Map<List<GetFavoriteDto>>(favorites);
        foreach (var favorite in favoriteDtos)
        {
            favorite.Post.PhotoUrl = await _unitOfWork.PostPhotoRepository.GetFirstPostPhotoByPostId(favorite.Post.Id);
        }
        
        return new ApiResponse<List<GetFavoriteDto>>
        {
            Data = favoriteDtos,
            Message = "Favorites retrieved successfully."
        };
    }

    public async Task<ApiResponse<Favorite>> AddFavoriteAsync(AddFavoriteDto favoriteAddDto)
    {
        var favoriteToCreate = _mapper.Map<AddFavoriteDto, Favorite>(favoriteAddDto);

        var createdFavorite = await _unitOfWork.FavoriteRepository.AddAsync(favoriteToCreate);
        if (createdFavorite == null)
        {
            throw new InternalServerErrorException("Failed to add favorite.");
        }

        return new ApiResponse<Favorite>
        {
            Data = createdFavorite,
            Message = "Favorite added successfully."
        };
    }

    public async Task<ApiResponse<bool>> RemoveFavoriteAsync(int id)
    {
        var favorite = await _unitOfWork.FavoriteRepository.GetAsync(id);
        if (favorite == null)
        {
            throw new NotFoundException("Favorite not found.");
        }

        var deletedFavorite = await _unitOfWork.FavoriteRepository.DeleteAsync(id);
        if (!deletedFavorite)
        {
            throw new InternalServerErrorException("Error occurred while removing favorite.");
        }

        return new ApiResponse<bool> { Message = "Favorite removed successfully." };
    }
}