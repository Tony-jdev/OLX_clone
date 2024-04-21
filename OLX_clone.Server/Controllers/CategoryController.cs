using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OLX_clone.Server.Helpers;
using OLX_clone.Server.Models;
using OLX_clone.Server.Models.Dtos;
using OLX_clone.Server.Models.Dtos.Category;
using OLX_clone.Server.Services.CategoryService;

namespace OLX_clone.Server.Controllers;

[ApiController]
[Route("api/categories")]
public class CategoryController: ControllerBase
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
    public async Task<ActionResult<ApiResponse<Category>>> CreateCategory([FromForm] CreateCategoryDto categoryCreateDto)
    {
        var apiResponse = new ApiResponse<Category>{ Success = false, Message = "Model is invalid" };
        try
        {
            if (ModelState.IsValid)
            {
                apiResponse = await _categoryService.CreateCategory(categoryCreateDto);
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
    public async Task<ActionResult<ApiResponse<Category>>> UpdateCategory(int id, [FromForm] UpdateCategoryDto categoryUpdateDto)
    {
        var apiResponse = new ApiResponse<Category> { Success = false, Message = "Model is invalid" };
        try
        {
            if (ModelState.IsValid)
            {
                if (id != categoryUpdateDto.Id){
                    apiResponse.Message = "Wrong category";
                    return BadRequest(apiResponse);
                }

                apiResponse = await _categoryService.UpdateCategory(id, categoryUpdateDto);
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
    public async Task<ActionResult<ApiResponse<bool>>> DeleteCategory(int id)
    {
        var apiResponse = new ApiResponse<bool> { Success = false, Message = "Model not found" };
        try
        {
            if (id == 0)
                return BadRequest(apiResponse);

            apiResponse = await _categoryService.DeleteCategory(id);
            if (!apiResponse.Success && apiResponse.Message == "Category not found.")
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