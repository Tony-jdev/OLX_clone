﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OLX_clone.BusinessLogicLayer.Services.Contracts;
using OLX_clone.DataAccessLayer.Helpers;
using OLX_clone.DataAccessLayer.Models;
using OLX_clone.DataAccessLayer.Models.Dtos;
using OLX_clone.DataAccessLayer.Models.Dtos.Post;

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
        string? searchTerm, string? orderBy, string? location, double? priceFrom, double? priceTo, string? status, int page = 1)
    {
        var apiResponse = await _postService.GetPosts(searchTerm, orderBy, location, priceFrom, priceTo, status, page);
        if (!apiResponse.Success)
        {
            return BadRequest(apiResponse);
        }
        return Ok(apiResponse);
    }

    [HttpGet("category/{categorySku}", Name = "GetPostByCategory")]
    public async Task<ActionResult<ApiResponse<PagedList<GetPostDto>>>> GetPostsByCategory(string categorySku,
        string? searchTerm, string? orderBy, string? location, double? priceFrom, double? priceTo, string? status, int page = 1)
    {
        var apiResponse = await _postService.GetPostsByCategory(
            categorySku, searchTerm, orderBy, location, priceFrom, priceTo,status, page);
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

        var apiResponse = await _postService.CreatePost(postCreateDto);
        if (!apiResponse.Success)
        {
            return BadRequest(apiResponse);
        }
        return Ok(apiResponse);
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

        var apiResponse = await _postService.UpdatePost(id, postUpdateDto);
        if (!apiResponse.Success)
        {
            return BadRequest(apiResponse);
        }
        return Ok(apiResponse);
    }
    
    [HttpPatch("{postId:int}/status")]
    public async Task<IActionResult> UpdatePostStatus(int postId, [FromBody] UpdatePostStatusDto updateStatusDto)
    {
        var response = await _postService.UpdatePostStatus(postId, updateStatusDto.NewStatus);
        if (response.Success)
        {
            return Ok(response);
        }
        else
        {
            return BadRequest(response);
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

        var apiResponse = await _postService.DeletePost(id);
        if (!apiResponse.Success)
        {
            return BadRequest(apiResponse);
        }
        return Ok(apiResponse);
    }

    [HttpDelete("photo/{id:int}", Name = "DeletePhoto")]
    [Authorize]
    public async Task<ActionResult<ApiResponse<bool>>> DeletePhoto(int id)
    {
        if (id == 0)
        {
            return BadRequest(new ApiResponse<bool> { Success = false, Message = "Invalid photo ID"});
        }

        var apiResponse = await _postService.DeletePhoto(id);
        if (!apiResponse.Success)
        {
            return BadRequest(apiResponse);
        }
        return Ok(apiResponse);
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