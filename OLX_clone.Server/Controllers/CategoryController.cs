﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OLX_clone.BusinessLogicLayer.Services.Contracts;
using OLX_clone.DataAccessLayer.Helpers;
using OLX_clone.DataAccessLayer.Models;
using OLX_clone.DataAccessLayer.Models.Dtos.Category;

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
    public async Task<ActionResult<ApiResponse<List<GetCategoryDetailsDto>>>> GetCategories()
    {
        var apiResponse = await _categoryService.GetCategories();
        if (!apiResponse.Success)
        {
            return BadRequest(apiResponse);
        }
        return Ok(apiResponse);
    }

    [HttpGet("{id:int}", Name = "GetCategory")]
    public async Task<ActionResult<ApiResponse<GetCategoryDto>>> GetCategory(int id)
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

        var apiResponse = await _categoryService.CreateCategory(categoryCreateDto);
        if (!apiResponse.Success)
        {
            return BadRequest(apiResponse);
        }
        return Ok(apiResponse);
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

        var apiResponse = await _categoryService.UpdateCategory(id, categoryUpdateDto);
        if (!apiResponse.Success)
        {
            return BadRequest(apiResponse);
        }
        return Ok(apiResponse);
    }

    [HttpDelete("{id:int}")]
    //[Authorize(Roles = SD.Role_Admin)]
    public async Task<ActionResult<ApiResponse<bool>>> DeleteCategory(int id)
    {
        if (id == 0)
        {
            return BadRequest(new ApiResponse<bool> { Success = false, Message = "Invalid category ID" });
        }

        var apiResponse = await _categoryService.DeleteCategory(id);
        if (!apiResponse.Success)
        {
            return BadRequest(apiResponse);
        }
        return Ok(apiResponse);
    }
}