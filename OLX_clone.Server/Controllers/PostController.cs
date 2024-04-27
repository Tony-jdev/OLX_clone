using Microsoft.AspNetCore.Mvc;
using OLX_clone.Server.Helpers;
using OLX_clone.Server.Models;
using OLX_clone.Server.Models.Dtos.Post;
using OLX_clone.Server.Services.PostService;

namespace OLX_clone.Server.Controllers;

[ApiController]
[Route("api/posts")]
public class PostController: ControllerBase
{
    private readonly IPostService _postService;
    
    public PostController(IPostService postService)
    {
        _postService = postService;
    }
    
    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<GetPostDto>>>> GetPosts()
    {
        var apiResponse = await _postService.GetPosts();
        if (!apiResponse.Success)
        {
            return BadRequest(apiResponse);
        }

        return Ok(apiResponse);
    }
    
    [HttpGet("category/{categoryId}", Name = "GetPostByCategory")]
    public async Task<ActionResult<ApiResponse<List<GetPostDto>>>> GetPostsByCategory(int categoryId)
    {
        var apiResponse = await _postService.GetPostsByCategory(categoryId);
        if (!apiResponse.Success)
        {
            return BadRequest(apiResponse);
        }

        return Ok(apiResponse);
    }
    
    [HttpGet("{id:int}", Name = "GetPost")]
    public async Task<ActionResult<ApiResponse<GetPostDetailsDto>>> GetPost(int id)
    {
        var apiResponse = await _postService.GetPost(id);
        if (!apiResponse.Success)
        {
            return NotFound(apiResponse);
        }
        await _postService.AddPostView(id);
        
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
    
    [ActionName("DeletePhoto")]
    [Route("photo/{id:int}")]
    [HttpDelete]
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
}