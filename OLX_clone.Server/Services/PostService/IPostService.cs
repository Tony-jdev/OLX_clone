using OLX_clone.Server.Helpers;
using OLX_clone.Server.Models;
using OLX_clone.Server.Models.Dtos;
using OLX_clone.Server.Models.Dtos.Post;

namespace OLX_clone.Server.Services.PostService;

public interface IPostService
{
    Task<ApiResponse<List<GetPostDto>>> GetPosts();
    Task<ApiResponse<List<GetPostDto>>> GetPostsByCategory(int categoryId);
    Task<ApiResponse<GetPostDetailsDto>> GetPost(int id);
    Task<ApiResponse<Post>> CreatePost(CreatePostDto postCreateDto);
    Task<ApiResponse<Post>> UpdatePost(int id, UpdatePostDto postUpdateDto);
    Task<ApiResponse<bool>> DeletePost(int id);
    Task<ApiResponse<bool>> DeletePhoto(int photoId);

    Task AddPostView(int postId);
}