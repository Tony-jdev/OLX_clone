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
    private readonly IPostRepository _postRepository;
    private readonly IPostViewRepository _postViewRepository;
    private readonly IPostPhotoRepository _postPhotoRepository;
    private readonly ICategoryRepository _categoryRepository;
    private readonly IBlobService _blobService;
    private readonly IMapper _mapper;
    
    public PostService(IPostRepository postRepository, IPostViewRepository postViewRepository, 
        IPostPhotoRepository postPhotoRepository, ICategoryRepository categoryRepository,
        IBlobService blobService, IMapper mapper)
    {
        _postRepository = postRepository;
        _postViewRepository = postViewRepository;
        _postPhotoRepository = postPhotoRepository;
        _categoryRepository = categoryRepository;
        _mapper = mapper;
        _blobService = blobService;
    }
    
    public async Task<ApiResponse<List<GetPostDto>>> GetPosts()
    {
        var posts = await _postRepository.GetAllDetailedAsync();
        var getPostDtos = new List<GetPostDto>();
        foreach (var post in posts)
        {
            var getPost = _mapper.Map<Post, GetPostDto>(post);
            getPost.PhotoUrl = await _postPhotoRepository.GetFirstPostPhotoByPostId(getPost.Id);
            getPostDtos.Add(getPost);
        }
        
        return new ApiResponse<List<GetPostDto>> { Data = getPostDtos, Message = "Posts retrieved successfully." };
    }

    public async Task<ApiResponse<GetPostDetailsDto>> GetPost(int id)
    {
        var post = await _postRepository.GetDetailsAsync(id);
        if (post == null)
        {
            return new ApiResponse<GetPostDetailsDto> { Success = false, Message = "Post not found." };
        }
        
        var postToView = _mapper.Map<Post, GetPostDetailsDto>(post);
        postToView.Photos = await _postPhotoRepository.GetPostPhotosByPostId(id);
        postToView.ViewsCount = await _postViewRepository.GetAllPostViewsCountByPostId(id);
        
        return new ApiResponse<GetPostDetailsDto> { Data = postToView, Message = "Post retrieved successfully." };
    }

    public async Task<ApiResponse<Post>> CreatePost(CreatePostDto postCreateDto)
    {
        if (postCreateDto.Files.Count == 0)
            return new ApiResponse<Post> { Success = false, Message = "There are no files provided" };

        var postToCreate = _mapper.Map<CreatePostDto, Post>(postCreateDto);
        List<Category> categories = new List<Category>();
        foreach (var categoryId in postCreateDto.CategoriesId)
        {
            var category = await _categoryRepository.GetAsync(categoryId);
            categories.Add(category);
        }
        postToCreate.Categories = categories;
        
        var createdPost = await _postRepository.AddAsync(postToCreate);
        
        List<PostPhoto> postPhotos = new List<PostPhoto>();
        string fileName, createdFile;
        foreach (var file in postCreateDto.Files)
        {
            fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            createdFile = await _blobService.UploadBlob(fileName, SD.SD_Storage_Container, file);
            postPhotos.Add(new PostPhoto{PostId = createdPost.Id, PhotoUrl = createdFile});
        }

        await _postPhotoRepository.AddRangeAsync(postPhotos);

        return new ApiResponse<Post> { Data = createdPost, Message = "Post created successfully" };
    }

    public async Task<ApiResponse<Post>> UpdatePost(int id, UpdatePostDto postUpdateDto)
    {
        Post postFromDb = await _postRepository.GetDetailsAsync(id);
        if (postFromDb == null)
            return new ApiResponse<Post> { Success = false, Message = "Post not found." };
        
        List<Category> categories = new List<Category>();
        foreach (var categoryId in postUpdateDto.CategoriesId)
        {
            var category = await _categoryRepository.GetAsync(categoryId);
            categories.Add(category);
        }
        postFromDb.Categories = categories;
        
        //Add new photos
        List<PostPhoto> postPhotos = new List<PostPhoto>();
        string fileName, createdFile;
        if (postUpdateDto.Files != null)
        {
            foreach (var file in postUpdateDto.Files)
            {
                fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
                createdFile = await _blobService.UploadBlob(fileName, SD.SD_Storage_Container, file);
                postPhotos.Add(new PostPhoto{PostId = postUpdateDto.Id, PhotoUrl = createdFile});
            }
            await _postPhotoRepository.AddRangeAsync(postPhotos);
        }
        postFromDb = _mapper.Map(postUpdateDto, postFromDb);

        var updatedPost = await _postRepository.UpdateAsync(postFromDb);

        return new ApiResponse<Post> { Data = updatedPost, Message = "Post updated successfully" };
    }

    public async Task<ApiResponse<bool>> DeletePost(int id)
    {
        Post postFromDb = await _postRepository.GetAsync(id);
        if (postFromDb == null)
            return new ApiResponse<bool> { Success = false, Message = "Post not found." };

        foreach (var image in await _postPhotoRepository.GetPostPhotosByPostId(id))
        {
            await _blobService.DeleteBlob(image.PhotoUrl.Split('/').Last(), SD.SD_Storage_Container);
        }
        var deletedPost = await _postRepository.DeleteAsync(id);

        return !deletedPost ? new ApiResponse<bool> { Success = false, Message = "Error occured while deleting post." } 
            : new ApiResponse<bool> { Message = "Post deleted successfully" };
    }
    
    public async Task AddPostView(int postId)
    {
        PostView postView = new PostView{PostId = postId};
        await _postViewRepository.AddAsync(postView);
    }
    
    public async Task<ApiResponse<bool>> DeletePhoto(int photoId)
    {
        PostPhoto postPhotoFromDb = await _postPhotoRepository.GetAsync(photoId);
        if (postPhotoFromDb == null)
            return new ApiResponse<bool> { Success = false, Message = "Photo not found." };

        await _blobService.DeleteBlob(postPhotoFromDb.PhotoUrl.Split('/').Last(), SD.SD_Storage_Container);
        var deletedPostPhoto = await _postPhotoRepository.DeleteAsync(photoId);

        return !deletedPostPhoto ? new ApiResponse<bool> { Success = false, Message = "Error occured while deleting photo." } 
            : new ApiResponse<bool> { Message = "Image deleted successfully" };
    }
}