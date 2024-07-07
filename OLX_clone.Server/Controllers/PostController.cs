using Microsoft.AspNetCore.Authorization;
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
    public async Task<ActionResult<ApiResponse<PagedList<GetPostDto>>>> GetVipPosts([FromQuery] int number = 4)
    {
        var apiResponse = await _postService.GetVipPosts(number);
        return apiResponse.Success ? Ok(apiResponse) : BadRequest(apiResponse);
    }
    
    [HttpGet("recently-sold")]
    public async Task<ActionResult<ApiResponse<List<GetRecentlySoldPostDto>>>> GetRecentlySoldProducts([FromQuery] int number = 13)
    {
        var apiResponse = await _postService.GetRecentlySoldPosts(number);
        return apiResponse.Success ? Ok(apiResponse) : BadRequest(apiResponse);
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<PagedList<GetPostDto>>>> GetPosts(
       string? searchTerm, string? orderBy, string? location, string? type, double? priceFrom, double? priceTo, string? status, int page = 1)
    {
        var apiResponse = await _postService.GetPosts(searchTerm, orderBy, location, type, priceFrom, priceTo, status, page);
        return apiResponse.Success ? Ok(apiResponse) : BadRequest(apiResponse);
    }

    [HttpGet("category/{categorySku}", Name = "GetPostByCategory")]
    public async Task<ActionResult<ApiResponse<PagedList<GetPostDto>>>> GetPostsByCategory(
        string categorySku, string? searchTerm, string? orderBy, string? location, string? type, 
        double? priceFrom, double? priceTo, string? status, int page = 1)
    {
        var apiResponse = await _postService.GetPostsByCategory(categorySku, searchTerm, orderBy, location, type, priceFrom, priceTo, status, page);
        return apiResponse.Success ? Ok(apiResponse) : BadRequest(apiResponse);
    }

    [HttpGet("{sku}", Name = "GetPost")]
    public async Task<ActionResult<ApiResponse<GetPostDetailsDto>>> GetPost(string sku)
    {
        var apiResponse = await _postService.GetPost(sku);
        if (apiResponse.Success)
        {
            await _postService.AddPostView(apiResponse.Data.Id);
            return Ok(apiResponse);
        }
        return NotFound(apiResponse);
    }

    [HttpPost]
    public async Task<ActionResult<ApiResponse<Post>>> CreatePost([FromForm] CreatePostDto postCreateDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new ApiResponse<Post> { Success = false, Message = "Model is invalid" });
        }

        var apiResponse = await _postService.CreatePost(postCreateDto);
        return apiResponse.Success ? Ok(apiResponse) : BadRequest(apiResponse);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<ApiResponse<Post>>> UpdatePost(int id, [FromForm] UpdatePostDto postUpdateDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new ApiResponse<Post> { Success = false, Message = "Model is invalid" });
        }

        if (id != postUpdateDto.Id)
        {
            return BadRequest(new ApiResponse<Post> { Success = false, Message = "Wrong post" });
        }

        var apiResponse = await _postService.UpdatePost(id, postUpdateDto);
        return apiResponse.Success ? Ok(apiResponse) : BadRequest(apiResponse);
    }
    
    [HttpPatch("{postId:int}/status")]
    public async Task<IActionResult> UpdatePostStatus(int postId, [FromBody] UpdatePostStatusDto updateStatusDto)
    {
        var response = await _postService.UpdatePostStatus(postId, updateStatusDto.NewStatus);
        return response.Success ? Ok(response) : BadRequest(response);
    }

    [HttpDelete("{id:int}")]
    /*[Authorize]*/
    public async Task<ActionResult<ApiResponse<bool>>> DeletePost(int id)
    {
        if (id == 0)
        {
            return BadRequest(new ApiResponse<bool> { Success = false, Message = "Invalid post ID" });
        }

        var apiResponse = await _postService.DeletePost(id);
        return apiResponse.Success ? Ok(apiResponse) : BadRequest(apiResponse);
    }

    [HttpDelete("photo/{id:int}", Name = "DeletePhoto")]
    /*[Authorize]*/
    public async Task<ActionResult<ApiResponse<bool>>> DeletePhoto(int id)
    {
        if (id == 0)
        {
            return BadRequest(new ApiResponse<bool> { Success = false, Message = "Invalid photo ID" });
        }

        var apiResponse = await _postService.DeletePhoto(id);
        return apiResponse.Success ? Ok(apiResponse) : BadRequest(apiResponse);
    }

    [HttpPost("{postId}/boost")]
    public async Task<ActionResult<ApiResponse<bool>>> BoostPost(int postId)
    {
        var response = await _boostService.BoostPost(postId);
        return response.Success ? Ok(response) : BadRequest(response);
    }
}
