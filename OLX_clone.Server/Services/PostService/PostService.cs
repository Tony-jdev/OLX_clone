using AutoMapper;
using OLX_clone.Server.Data.Contracts;
using OLX_clone.Server.Helpers;
using OLX_clone.Server.Models;
using OLX_clone.Server.Models.Dtos;
using OLX_clone.Server.Models.Dtos.Post;
using OLX_clone.Server.Services.BlobService;

namespace OLX_clone.Server.Services.PostService;

public class PostService : IPostService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IBlobService _blobService;
    private readonly IMapper _mapper;
    
    public PostService(IUnitOfWork unitOfWork,
        IBlobService blobService, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
        _blobService = blobService;
    }
    
    public async Task<ApiResponse<List<GetPostDto>>> GetPosts()
    {
        var posts = await _unitOfWork.PostRepository.GetAllDetailedAsync();
        var getPostDtos = new List<GetPostDto>();
        foreach (var post in posts)
        {
            var getPost = _mapper.Map<Post, GetPostDto>(post);
            getPost.PhotoUrl = await _unitOfWork.PostPhotoRepository.GetFirstPostPhotoByPostId(getPost.Id);
            getPostDtos.Add(getPost);
        }
        
        return new ApiResponse<List<GetPostDto>> { Data = getPostDtos, Message = "Posts retrieved successfully." };
    }
    
    public async Task<ApiResponse<List<GetPostDto>>> GetPostsByCategory(int categoryId)
    {
        var posts = await _unitOfWork.PostRepository.GetAllByCategoryAsync(categoryId);
        var getPostDtos = new List<GetPostDto>();
        foreach (var post in posts)
        {
            var getPost = _mapper.Map<Post, GetPostDto>(post);
            getPost.PhotoUrl = await _unitOfWork.PostPhotoRepository.GetFirstPostPhotoByPostId(getPost.Id);
            getPostDtos.Add(getPost);
        }
        
        return new ApiResponse<List<GetPostDto>> { Data = getPostDtos, Message = "Posts retrieved successfully." };
    }

    public async Task<ApiResponse<GetPostDetailsDto>> GetPost(int id)
    {
        var post = await _unitOfWork.PostRepository.GetDetailsAsync(id);
        if (post == null)
        {
            return new ApiResponse<GetPostDetailsDto> { Success = false, Message = "Post not found." };
        }
        
        var postToView = _mapper.Map<Post, GetPostDetailsDto>(post);
        postToView.Photos = await _unitOfWork.PostPhotoRepository.GetPostPhotosByPostId(id);
        postToView.ViewsCount = await _unitOfWork.PostViewRepository.GetAllPostViewsCountByPostId(id);
        
        return new ApiResponse<GetPostDetailsDto> { Data = postToView, Message = "Post retrieved successfully." };
    }

    public async Task<ApiResponse<Post>> CreatePost(CreatePostDto postCreateDto)
    {
        if (postCreateDto.Files.Count == 0)
            return new ApiResponse<Post> { Success = false, Message = "There are no files provided" };

        var postToCreate = _mapper.Map<CreatePostDto, Post>(postCreateDto);
        
        var createdPost = await _unitOfWork.PostRepository.AddAsync(postToCreate);
        
        var postPhotos = await UploadPostPhotos(postCreateDto.Files, createdPost.Id);
        await _unitOfWork.PostPhotoRepository.AddRangeAsync(postPhotos);

        return new ApiResponse<Post> { Data = createdPost, Message = "Post created successfully" };
    }

    public async Task<ApiResponse<Post>> UpdatePost(int id, UpdatePostDto postUpdateDto)
    {
        Post postFromDb = await _unitOfWork.PostRepository.GetDetailsAsync(id);
        if (postFromDb == null)
            return new ApiResponse<Post> { Success = false, Message = "Post not found." };
        
        //Add new photos
        if (postUpdateDto.Files != null)
        {
            var postPhotos = await UploadPostPhotos(postUpdateDto.Files, postFromDb.Id);
            await _unitOfWork.PostPhotoRepository.AddRangeAsync(postPhotos);
        }
        postFromDb = _mapper.Map(postUpdateDto, postFromDb);

        var updatedPost = await _unitOfWork.PostRepository.UpdateAsync(postFromDb);

        return new ApiResponse<Post> { Data = updatedPost, Message = "Post updated successfully" };
    }

    public async Task<ApiResponse<bool>> DeletePost(int id)
    {
        using (var transaction = await _unitOfWork.PostRepository.BeginTransactionAsync())
        {
            try
            {
                Post postFromDb = await _unitOfWork.PostRepository.GetAsync(id);
                if (postFromDb == null)
                    return new ApiResponse<bool> { Success = false, Message = "Post not found." };

                // Видалення пов'язаних фотографій
                foreach (var image in await _unitOfWork.PostPhotoRepository.GetPostPhotosByPostId(id))
                {
                    await _blobService.DeleteBlob(image.PhotoUrl.Split('/').Last(), SD.SD_Storage_Container);
                    await _unitOfWork.PostPhotoRepository.DeleteAsync(image.Id);
                }

                // Видалення оголошення
                await _unitOfWork.PostRepository.DeleteAsync(id);

                await transaction.CommitAsync();

                return new ApiResponse<bool> { Message = "Post deleted successfully" };
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return new ApiResponse<bool> { Success = false, Message = "Error occured while deleting post: " + ex.Message };
            }
        }
    }
    
    public async Task<ApiResponse<bool>> DeletePhoto(int photoId)
    {
        PostPhoto postPhotoFromDb = await _unitOfWork.PostPhotoRepository.GetAsync(photoId);
        if (postPhotoFromDb == null)
            return new ApiResponse<bool> { Success = false, Message = "Photo not found." };

        await _blobService.DeleteBlob(postPhotoFromDb.PhotoUrl.Split('/').Last(), SD.SD_Storage_Container);
        var deletedPostPhoto = await _unitOfWork.PostPhotoRepository.DeleteAsync(photoId);

        return !deletedPostPhoto ? new ApiResponse<bool> { Success = false, Message = "Error occured while deleting photo." } 
            : new ApiResponse<bool> { Message = "Image deleted successfully" };
    }
    
    public async Task AddPostView(int postId)
    {
        PostView postView = new PostView{PostId = postId};
        await _unitOfWork.PostViewRepository.AddAsync(postView);
    }   
    
    private async Task<List<Category>> GetCategoriesByIds(List<int> categoryIds)
    {
        var categories = new List<Category>();
        foreach (var categoryId in categoryIds)
        {
            var category = await _unitOfWork.CategoryRepository.GetAsync(categoryId);
            if (category != null)
                categories.Add(category);
        }
        return categories;
    }
    
    private async Task<List<PostPhoto>> UploadPostPhotos(List<IFormFile> files, int postId)
    {
        var postPhotos = new List<PostPhoto>();
        foreach (var file in files)
        {
            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            var createdFile = await _blobService.UploadBlob(fileName, SD.SD_Storage_Container, file);
            postPhotos.Add(new PostPhoto { PostId = postId, PhotoUrl = createdFile });
        }
        return postPhotos;
    }
}