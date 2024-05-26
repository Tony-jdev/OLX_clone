using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OLX_clone.Server.Helpers;
using OLX_clone.Server.Models;
using OLX_clone.Server.Models.Dtos.Category;
using OLX_clone.Server.Services.CategoryService;

namespace OLX_clone.Server.Controllers;

[ApiController]
[Route("api/categories")]
public class CategoryController : ControllerBase
{
    private readonly ICategoryService _categoryService;

    public CategoryController(ICategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<Category>>>> GetCategories()
    {
        var apiResponse = await _categoryService.GetCategories();
        if (!apiResponse.Success)
        {
            return BadRequest(apiResponse);
        }
        return Ok(apiResponse);
    }

    [HttpGet("{id:int}", Name = "GetCategory")]
    public async Task<ActionResult<ApiResponse<Category>>> GetCategory(int id)
    {
        var apiResponse = await _categoryService.GetCategory(id);
        if (!apiResponse.Success)
        {
            return NotFound(apiResponse);
        }
        return Ok(apiResponse);
    }

    [HttpPost]
    //[Authorize(Roles = SD.Role_Admin)]
    public async Task<ActionResult<ApiResponse<Category>>> CreateCategory([FromForm] CreateCategoryDto categoryCreateDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new ApiResponse<Category> { Success = false, Message = "Model is invalid" });
        }

        try
        {
            var apiResponse = await _categoryService.CreateCategory(categoryCreateDto);
            if (!apiResponse.Success)
            {
                return BadRequest(apiResponse);
            }
            return Ok(apiResponse);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ApiResponse<Category> { Success = false, Message = ex.Message });
        }
    }

    [HttpPut("{id:int}")]
    //[Authorize(Roles = SD.Role_Admin)]
    public async Task<ActionResult<ApiResponse<Category>>> UpdateCategory(int id, [FromForm] UpdateCategoryDto categoryUpdateDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new ApiResponse<Category> { Success = false, Message = "Model is invalid" });
        }

        if (id != categoryUpdateDto.Id)
        {
            return BadRequest(new ApiResponse<Category> { Success = false, Message = "Wrong category ID" });
        }

        try
        {
            var apiResponse = await _categoryService.UpdateCategory(id, categoryUpdateDto);
            if (!apiResponse.Success)
            {
                return BadRequest(apiResponse);
            }
            return Ok(apiResponse);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ApiResponse<Category> { Success = false, Message = ex.Message });
        }
    }

    [HttpDelete("{id:int}")]
    //[Authorize(Roles = SD.Role_Admin)]
    public async Task<ActionResult<ApiResponse<bool>>> DeleteCategory(int id)
    {
        if (id == 0)
        {
            return BadRequest(new ApiResponse<bool> { Success = false, Message = "Invalid category ID" });
        }

        try
        {
            var apiResponse = await _categoryService.DeleteCategory(id);
            if (!apiResponse.Success)
            {
                return apiResponse.Message == "Category not found" ? NotFound(apiResponse) : BadRequest(apiResponse);
            }
            return Ok(apiResponse);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ApiResponse<bool> { Success = false, Message = ex.Message });
        }
    }
}