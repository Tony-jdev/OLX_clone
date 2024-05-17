using Microsoft.AspNetCore.Authorization;
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
public class PostController: ControllerBase
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
    public async Task<ActionResult<ApiResponse<PagedList<GetPostDto>>>> GetPosts(string? searchTerm, string? orderBy, int page = 1)
    {
        var apiResponse = await _postService.GetPosts(searchTerm, orderBy, page);
        if (!apiResponse.Success)
        {
            return BadRequest(apiResponse);
        }

        return Ok(apiResponse);
    }
    
    [HttpGet("category/{categorySku}", Name = "GetPostByCategory")]
    public async Task<ActionResult<ApiResponse<PagedList<GetPostDto>>>> GetPostsByCategory(string categorySku,
        string? searchTerm, string? orderBy, int page = 1)
    {
        var apiResponse = await _postService.GetPostsByCategory(categorySku, searchTerm, orderBy, page);
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
        var apiResponse = new ApiResponse<Post>{ Success = false, Message = "Model is invalid" };
        try
        {
            if (ModelState.IsValid)
            {
                apiResponse = await _postService.CreatePost(postCreateDto);
                if (!apiResponse.Success)
                {
                    return NotFound(apiResponse);
                }
                return Ok(apiResponse);
            }
        }
        catch (Exception ex)
        {
            apiResponse.Success = false;
            apiResponse.Message = ex.Message;
        }

        return BadRequest(apiResponse);
    }
    
    [HttpPut("{id:int}")]
    [Authorize]
    public async Task<ActionResult<ApiResponse<Post>>> UpdatePost(int id, [FromForm] UpdatePostDto postUpdateDto)
    {
        var apiResponse = new ApiResponse<Post> { Success = false, Message = "Model is invalid" };
        try
        {
            if (ModelState.IsValid)
            {
                if (id != postUpdateDto.Id){
                    apiResponse.Message = "Wrong post";
                    return BadRequest(apiResponse);
                }

                apiResponse = await _postService.UpdatePost(id, postUpdateDto);
                if (!apiResponse.Success)
                {
                    return BadRequest(apiResponse);
                }
                return Ok(apiResponse);
            }
        }
        catch (Exception ex)
        {
            apiResponse.Success = false;
            apiResponse.Message = ex.Message;
        }

        return BadRequest(apiResponse);
    }
    
    [HttpDelete("{id:int}")]
    [Authorize]
    public async Task<ActionResult<ApiResponse<bool>>> DeletePost(int id)
    {
        var apiResponse = new ApiResponse<bool> { Success = false, Message = "Model not found" };
        try
        {
            if (id == 0)
                return BadRequest(apiResponse);

            apiResponse = await _postService.DeletePost(id);
            if (!apiResponse.Success && apiResponse.Message == "Post not found.")
            {
                return NotFound(apiResponse);
            }

            if(!apiResponse.Success) return BadRequest(apiResponse);

            return Ok(apiResponse);
        }
        catch (Exception ex)
        {
            apiResponse.Success = false;
            apiResponse.Message = ex.Message;
        }

        return apiResponse;
    }
    
    [Route("photo/{id:int}", Name = "DeletePhoto")]
    [HttpDelete]
    [Authorize]
    public async Task<ActionResult<ApiResponse<bool>>> DeletePhoto(int id)
    {
        var apiResponse = new ApiResponse<bool> { Success = false, Message = "Model not found" };
        try
        {
            if (id == 0)
                return BadRequest(apiResponse);

            apiResponse = await _postService.DeletePhoto(id);
            if (!apiResponse.Success && apiResponse.Message == "Photo not found.")
            {
                return NotFound(apiResponse);
            }

            if(!apiResponse.Success) return BadRequest(apiResponse);

            return Ok(apiResponse);
        }
        catch (Exception ex)
        {
            apiResponse.Success = false;
            apiResponse.Message = ex.Message;
        }

        return apiResponse;
    }
    
    [HttpPost("{postId}/boost")]
    public async Task<ActionResult<ApiResponse<bool>>> BoostPost(int postId)
    {
        var response = await _boostService.BoostPost(postId);

        if (response.Success)
        {
            return Ok(response);
        }
        else
        {
            return BadRequest(response);
        }
    }
}