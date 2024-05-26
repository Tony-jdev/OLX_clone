﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OLX_clone.Server.Data.Contracts;
using OLX_clone.Server.Helpers;
using OLX_clone.Server.Models;
using OLX_clone.Server.Models.Dtos;
using OLX_clone.Server.Models.Dtos.Post;
using OLX_clone.Server.Services.BoostService;
using OLX_clone.Server.Services.PostService;

namespace OLX_clone.Server.Controllers;

[ApiController]
[Route("api/posts")]
public class PostController : ControllerBase
{
    private readonly IPostService _postService;
    private readonly IBoostService _boostService;

    public PostController(IPostService postService, IBoostService boostService)
    {
        _postService = postService;
        _boostService = boostService;
    }

    [HttpGet("vip")]
    public async Task<ActionResult<ApiResponse<PagedList<GetPostDto>>>> GetVipPosts()
    {
        var apiResponse = await _postService.GetVipPosts();
        if (!apiResponse.Success)
        {
            return BadRequest(apiResponse);
        }
        return Ok(apiResponse);
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<PagedList<GetPostDto>>>> GetPosts(
        string? searchTerm, string? orderBy, string? status, int page = 1)
    {
        var apiResponse = await _postService.GetPosts(searchTerm, orderBy, status, page);
        if (!apiResponse.Success)
        {
            return BadRequest(apiResponse);
        }
        return Ok(apiResponse);
    }

    [HttpGet("category/{categorySku}", Name = "GetPostByCategory")]
    public async Task<ActionResult<ApiResponse<PagedList<GetPostDto>>>> GetPostsByCategory(string categorySku,
        string? searchTerm, string? orderBy, string? status, int page = 1)
    {
        var apiResponse = await _postService.GetPostsByCategory(categorySku, searchTerm, orderBy, status, page);
        if (!apiResponse.Success)
        {
            return BadRequest(apiResponse);
        }
        return Ok(apiResponse);
    }

    [HttpGet("{sku}", Name = "GetPost")]
    public async Task<ActionResult<ApiResponse<GetPostDetailsDto>>> GetPost(string sku)
    {
        var apiResponse = await _postService.GetPost(sku);
        if (!apiResponse.Success)
        {
            return NotFound(apiResponse);
        }
        await _postService.AddPostView(apiResponse.Data.Id);
        return Ok(apiResponse);
    }

    [HttpPost]
    public async Task<ActionResult<ApiResponse<Post>>> CreatePost([FromForm] CreatePostDto postCreateDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new ApiResponse<Post> { Success = false, Message = "Model is invalid"});
        }

        try
        {
            var apiResponse = await _postService.CreatePost(postCreateDto);
            if (!apiResponse.Success)
            {
                return BadRequest(apiResponse);
            }
            return Ok(apiResponse);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ApiResponse<Post> { Success = false, Message = ex.Message});
        }
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<ApiResponse<Post>>> UpdatePost(int id, [FromForm] UpdatePostDto postUpdateDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new ApiResponse<Post> { Success = false, Message = "Model is invalid"});
        }

        if (id != postUpdateDto.Id)
        {
            return BadRequest(new ApiResponse<Post> { Success = false, Message = "Wrong post"});
        }

        try
        {
            var apiResponse = await _postService.UpdatePost(id, postUpdateDto);
            if (!apiResponse.Success)
            {
                return BadRequest(apiResponse);
            }
            return Ok(apiResponse);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ApiResponse<Post> { Success = false, Message = ex.Message, Data = null });
        }
    }

    [HttpDelete("{id:int}")]
    [Authorize]
    public async Task<ActionResult<ApiResponse<bool>>> DeletePost(int id)
    {
        if (id == 0)
        {
            return BadRequest(new ApiResponse<bool> { Success = false, Message = "Invalid post ID"});
        }

        try
        {
            var apiResponse = await _postService.DeletePost(id);
            if (!apiResponse.Success)
            {
                return apiResponse.Message == "Post not found." ? NotFound(apiResponse) : BadRequest(apiResponse);
            }
            return Ok(apiResponse);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ApiResponse<bool> { Success = false, Message = ex.Message});
        }
    }

    [HttpDelete("photo/{id:int}", Name = "DeletePhoto")]
    [Authorize]
    public async Task<ActionResult<ApiResponse<bool>>> DeletePhoto(int id)
    {
        if (id == 0)
        {
            return BadRequest(new ApiResponse<bool> { Success = false, Message = "Invalid photo ID"});
        }

        try
        {
            var apiResponse = await _postService.DeletePhoto(id);
            if (!apiResponse.Success)
            {
                return apiResponse.Message == "Photo not found." ? NotFound(apiResponse) : BadRequest(apiResponse);
            }
            return Ok(apiResponse);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ApiResponse<bool> { Success = false, Message = ex.Message});
        }
    }

    [HttpPost("{postId}/boost")]
    public async Task<ActionResult<ApiResponse<bool>>> BoostPost(int postId)
    {
        var response = await _boostService.BoostPost(postId);
        if (response.Success)
        {
            return Ok(response);
        }
        return BadRequest(response);
    }
}