using OLX_clone.DataAccessLayer.Helpers;
using OLX_clone.DataAccessLayer.Models;
using OLX_clone.DataAccessLayer.Models.Dtos;
using OLX_clone.DataAccessLayer.Models.Dtos.Post;
using OLX_clone.DataAccessLayer.Models.Enums;

namespace OLX_clone.BusinessLogicLayer.Services.Contracts;

public interface IPostService
{
    Task<ApiResponse<List<GetPostDto>>> GetVipPosts(int number);
    Task<List<GetPostProfileDto>> GetPostsByUser(string userId);
    Task<ApiResponse<PagedList<GetPostDto>>> GetPosts(
        string? searchTerm, string? orderBy, string? location, double? priceFrom, double? priceTo, string? status, int page);
    Task<ApiResponse<PagedList<GetPostDto>>> GetPostsByCategory(string categorySku, 
        string? searchTerm, string? orderBy, string? location, double? priceFrom, double? priceTo, string? status, int page);
    Task<ApiResponse<GetPostDetailsDto>> GetPost(string sku);
    Task<ApiResponse<Post>> CreatePost(CreatePostDto postCreateDto);
    Task<ApiResponse<Post>> UpdatePost(int id, UpdatePostDto postUpdateDto);
    Task<ApiResponse<bool>> UpdatePostStatus(int postId, PostStatus newStatus);
    Task<ApiResponse<bool>> DeletePost(int id);
    Task<ApiResponse<bool>> DeletePhoto(int photoId);

    Task AddPostView(int postId);
}