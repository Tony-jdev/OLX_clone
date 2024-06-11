using AutoMapper;
using Microsoft.AspNetCore.Http;
using OLX_clone.BusinessLogicLayer.Middleware.Exceptions;
using OLX_clone.BusinessLogicLayer.Services.Contracts;
using OLX_clone.DataAccessLayer.Helpers;
using OLX_clone.DataAccessLayer.Models;
using OLX_clone.DataAccessLayer.Models.Dtos;
using OLX_clone.DataAccessLayer.Models.Dtos.Post;
using OLX_clone.DataAccessLayer.Repositories.Contracts;

namespace OLX_clone.BusinessLogicLayer.Services;

public class PostService : IPostService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IBlobService _blobService;
    private readonly IMapper _mapper;
    
    public PostService(IUnitOfWork unitOfWork, IBlobService blobService, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
        _blobService = blobService;
    }
    
    public async Task<ApiResponse<List<GetPostDto>>> GetVipPosts()
    {
        var posts = await _unitOfWork.PostRepository.GetVipPostsAsync();

        var getPostDtos = _mapper.Map<List<GetPostDto>>(posts);
        await SetPhotoUrls(getPostDtos);
        
        return new ApiResponse<List<GetPostDto>> { Data = getPostDtos, Message = "Posts retrieved successfully." };
    }
    
    public async Task<List<GetPostDto>> GetPostsByUser(string userId)
    {
        var posts = await _unitOfWork.PostRepository.GetPostsByUserIdAsync(userId);

        var getPostDtos = _mapper.Map<List<GetPostDto>>(posts);
        await SetPhotoUrls(getPostDtos);
        
        return getPostDtos;
    }
    
    public async Task<ApiResponse<PagedList<GetPostDto>>> GetPosts(
        string? searchTerm, string? orderBy, string? location, double? priceFrom, double? priceTo, string? status, int page)
    {
        var posts = await _unitOfWork.PostRepository.GetAllAsync(searchTerm, orderBy, location, priceFrom, priceTo, status);
        var getPostDtos = _mapper.Map<List<GetPostDto>>(posts);
        var pagedPosts = await PagedList<GetPostDto>.CreateAsync(getPostDtos, page, 15);
        
        await SetPhotoUrls(pagedPosts.Items);
        
        return new ApiResponse<PagedList<GetPostDto>> { Data = pagedPosts, Message = "Posts retrieved successfully." };
    }
    
    public async Task<ApiResponse<PagedList<GetPostDto>>> GetPostsByCategory(string categorySku, 
        string? searchTerm, string? orderBy, string? location, double? priceFrom, double? priceTo, string? status, int page)
    {
        var categoryIds = await _unitOfWork.CategoryRepository.GetCategoryAndChildrenIds(categorySku);

        var posts = await _unitOfWork.PostRepository.GetAllByCategoryAsync(
            categoryIds, searchTerm, orderBy, location, priceFrom, priceTo, status);

        var getPostDtos = _mapper.Map<List<GetPostDto>>(posts);
        var pagedPosts = await PagedList<GetPostDto>.CreateAsync(getPostDtos, page, 15);
        
        await SetPhotoUrls(pagedPosts.Items);
        
        return new ApiResponse<PagedList<GetPostDto>> { Data = pagedPosts, Message = "Posts retrieved successfully." };
    }

    public async Task<ApiResponse<GetPostDetailsDto>> GetPost(string sku)
    {
        var post = await _unitOfWork.PostRepository.GetPostDetailsBySkuAsync(sku);
        if (post == null)
        {
            throw new NotFoundException("Post not found");
        }
        
        var postToView = _mapper.Map<Post, GetPostDetailsDto>(post);
        postToView.Photos = await _unitOfWork.PostPhotoRepository.GetPostPhotosByPostId(postToView.Id);
        postToView.ViewsCount = await _unitOfWork.PostViewRepository.GetAllPostViewsCountByPostId(postToView.Id);
        
        return new ApiResponse<GetPostDetailsDto> { Data = postToView, Message = "Post retrieved successfully." };
    }

    public async Task<ApiResponse<Post>> CreatePost(CreatePostDto postCreateDto)
    {
        if (postCreateDto.Files == null || postCreateDto.Files.Count == 0)
        {
            throw new BadRequestException("There are no files provided");
        }

        var postToCreate = _mapper.Map<CreatePostDto, Post>(postCreateDto);
        postToCreate.SKU = GeneratePostSKU(postToCreate.Title);
        
        var createdPost = await _unitOfWork.PostRepository.AddAsync(postToCreate);
        if (createdPost == null)
        {
            throw new InternalServerErrorException("Failed to create the post.");
        }

        var postPhotos = await UploadPostPhotos(postCreateDto.Files, createdPost.Id);
        await _unitOfWork.PostPhotoRepository.AddRangeAsync(postPhotos);

        return new ApiResponse<Post> { Data = createdPost, Message = "Post created successfully" };
    }

    public async Task<ApiResponse<Post>> UpdatePost(int id, UpdatePostDto postUpdateDto)
    {
        var postFromDb = await _unitOfWork.PostRepository.GetAsync(id);
        if (postFromDb == null)
        {
            throw new NotFoundException("Post not found");
        }

        if (postUpdateDto.Files != null)
        {
            var postPhotos = await UploadPostPhotos(postUpdateDto.Files, postFromDb.Id);
            await _unitOfWork.PostPhotoRepository.AddRangeAsync(postPhotos);
        }

        postFromDb = _mapper.Map(postUpdateDto, postFromDb);
        var updatedPost = await _unitOfWork.PostRepository.UpdateAsync(postFromDb);
        if (updatedPost == null)
        {
            throw new InternalServerErrorException("Failed to update the post.");
        }

        return new ApiResponse<Post> { Data = updatedPost, Message = "Post updated successfully" };
    }

    public async Task<ApiResponse<bool>> DeletePost(int id)
    {
        using (var transaction = await _unitOfWork.PostRepository.BeginTransactionAsync())
        {
            try
            {
                var postFromDb = await _unitOfWork.PostRepository.GetAsync(id);
                if (postFromDb == null)
                {
                    throw new NotFoundException("Post not found");
                }

                foreach (var image in await _unitOfWork.PostPhotoRepository.GetPostPhotosByPostId(id))
                {
                    await _blobService.DeleteBlob(image.PhotoUrl.Split('/').Last(), SD.SD_Storage_Container);
                    await _unitOfWork.PostPhotoRepository.DeleteAsync(image.Id);
                }

                await _unitOfWork.PostRepository.DeleteAsync(id);
                await transaction.CommitAsync();

                return new ApiResponse<bool> { Message = "Post deleted successfully" };
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                throw new InternalServerErrorException("Error occurred while deleting post");
            }
        }
    }
    
    public async Task<ApiResponse<bool>> DeletePhoto(int photoId)
    {
        var postPhotoFromDb = await _unitOfWork.PostPhotoRepository.GetAsync(photoId);
        if (postPhotoFromDb == null)
        {
            throw new NotFoundException("Photo not found");
        }

        await _blobService.DeleteBlob(postPhotoFromDb.PhotoUrl.Split('/').Last(), SD.SD_Storage_Container);
        var deletedPostPhoto = await _unitOfWork.PostPhotoRepository.DeleteAsync(photoId);
        if (!deletedPostPhoto)
        {
            throw new InternalServerErrorException("Error occurred while deleting photo");
        }

        return new ApiResponse<bool> { Message = "Image deleted successfully" };
    }
    
    public async Task AddPostView(int postId)
    {
        var postView = new PostView { PostId = postId };
        await _unitOfWork.PostViewRepository.AddAsync(postView);
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
    
    private string GeneratePostSKU(string title)
    {
        string guid = Guid.NewGuid().ToString("N").Substring(0, 8);
        string sku = $"ID{guid}";

        return sku;
    }
    
    private async Task SetPhotoUrls(IEnumerable<GetPostDto> posts)
    {
        foreach (var post in posts)
        {
            post.PhotoUrl = await _unitOfWork.PostPhotoRepository.GetFirstPostPhotoByPostId(post.Id);
        }
    }
}