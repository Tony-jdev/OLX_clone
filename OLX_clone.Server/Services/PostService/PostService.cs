﻿using AutoMapper;
using OLX_clone.Server.Data.Contracts;
using OLX_clone.Server.Helpers;
using OLX_clone.Server.Models;
using OLX_clone.Server.Models.Dtos.Post;

namespace OLX_clone.Server.Services.PostService;

public class PostService : IPostService
{
    private readonly IPostRepository _postRepository;
    private readonly IPostViewRepository _postViewRepository;
    private readonly IMapper _mapper;
    
    public PostService(IPostRepository postRepository, IPostViewRepository postViewRepository,IMapper mapper)
    {
        _postRepository = postRepository;
        _postViewRepository = postViewRepository;
        _mapper = mapper;
    }
    
    public async Task<ApiResponse<List<Post>>> GetPosts()
    {
        var posts = await _postRepository.GetAllDetailedAsync();
        return new ApiResponse<List<Post>> { Data = posts, Message = "Posts retrieved successfully." };
    }

    public async Task<ApiResponse<GetPostDetailsDto>> GetPost(int id)
    {
        var post = await _postRepository.GetDetailsAsync(id);
        if (post == null)
        {
            return new ApiResponse<GetPostDetailsDto> { Success = false, Message = "Post not found." };
        }
        
        var postToView = _mapper.Map<Post, GetPostDetailsDto>(post);
        postToView.ViewsCount = await _postViewRepository.GetAllPostViewsCountByPostId(id);
        
        return new ApiResponse<GetPostDetailsDto> { Data = postToView, Message = "Post retrieved successfully." };
    }

    public async Task<ApiResponse<Post>> CreatePost(CreatePostDto postCreateDto)
    {
        var postToCreate = _mapper.Map<CreatePostDto, Post>(postCreateDto);
        
        var createdPost = await _postRepository.AddAsync(postToCreate);

        return new ApiResponse<Post> { Data = createdPost, Message = "Post created successfully" };
    }

    public async Task<ApiResponse<Post>> UpdatePost(int id, UpdatePostDto postUpdateDto)
    {
        Post postFromDb = await _postRepository.GetAsync(id);
        if (postFromDb == null)
            return new ApiResponse<Post> { Success = false, Message = "Post not found." };

        postFromDb = _mapper.Map(postUpdateDto, postFromDb);

        var updatedPost = await _postRepository.UpdateAsync(postFromDb);

        return new ApiResponse<Post> { Data = updatedPost, Message = "Post updated successfully" };
    }

    public async Task<ApiResponse<bool>> DeletePost(int id)
    {
        Post postFromDb = await _postRepository.GetAsync(id);
        if (postFromDb == null)
            return new ApiResponse<bool> { Success = false, Message = "Post not found." };

        var deletedPost = await _postRepository.DeleteAsync(id);

        return !deletedPost ? new ApiResponse<bool> { Success = false, Message = "Error occured while deleting category." } 
            : new ApiResponse<bool> { Message = "Post deleted successfully" };
    }
    
    public async Task AddPostView(int postId)
    {
        PostView postView = new PostView{PostId = postId};
        await _postViewRepository.AddAsync(postView);
    }
}