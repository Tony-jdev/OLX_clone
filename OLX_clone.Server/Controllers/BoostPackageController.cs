using Microsoft.AspNetCore.Mvc;
using OLX_clone.BusinessLogicLayer.Services.Contracts;
using OLX_clone.DataAccessLayer.Helpers;
using OLX_clone.DataAccessLayer.Models;
using OLX_clone.DataAccessLayer.Models.Dtos.BoostPackage;

namespace OLX_clone.Server.Controllers;

[ApiController]
[Route("api/boost-packages")]
public class BoostPackageController : ControllerBase
{
    private readonly IBoostPackageService _boostPackageService;

    public BoostPackageController(IBoostPackageService boostPackageService)
    {
        _boostPackageService = boostPackageService;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<GetBoostPackageDto>>>> GetBoostPackages()
    {
        var apiResponse = await _boostPackageService.GetBoostPackages();
        if (!apiResponse.Success)
        {
            return BadRequest(apiResponse);
        }
        return Ok(apiResponse);
    }

    [HttpGet("{id:int}", Name = "GetBoostPackage")]
    public async Task<ActionResult<ApiResponse<BoostPackage>>> GetBoostPackage(int id)
    {
        var apiResponse = await _boostPackageService.GetBoostPackage(id);
        if (!apiResponse.Success)
        {
            return NotFound(apiResponse);
        }
        return Ok(apiResponse);
    }

    [HttpPost]
    public async Task<ActionResult<ApiResponse<BoostPackage>>> CreateBoostPackage([FromBody] CreateBoostPackageDto boostPackageCreateDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new ApiResponse<BoostPackage> { Success = false, Message = "Model is invalid" });
        }

        var apiResponse = await _boostPackageService.CreateBoostPackage(boostPackageCreateDto);
        if (!apiResponse.Success)
        {
            return BadRequest(apiResponse);
        }
        return Ok(apiResponse);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<ApiResponse<BoostPackage>>> UpdateBoostPackage(int id, [FromBody] UpdateBoostPackageDto boostPackageUpdateDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new ApiResponse<BoostPackage> { Success = false, Message = "Model is invalid" });
        }

        if (id != boostPackageUpdateDto.Id)
        {
            return BadRequest(new ApiResponse<BoostPackage> { Success = false, Message = "Wrong package ID" });
        }

        var apiResponse = await _boostPackageService.UpdateBoostPackage(id, boostPackageUpdateDto);
        if (!apiResponse.Success)
        {
            return BadRequest(apiResponse);
        }
        return Ok(apiResponse);
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult<ApiResponse<bool>>> DeleteBoostPackage(int id)
    {
        if (id == 0)
        {
            return BadRequest(new ApiResponse<bool> { Success = false, Message = "Invalid package ID" });
        }

        var apiResponse = await _boostPackageService.DeleteBoostPackage(id);
        if (!apiResponse.Success)
        {
            return apiResponse.Message == "Package not found" ? NotFound(apiResponse) : BadRequest(apiResponse);
        }
        return Ok(apiResponse);
    }

    [HttpPost("{postId}/purchase")]
    public async Task<ActionResult<ApiResponse<bool>>> PurchaseBoostPackage(string userId, int postId, int packageId)
    {
        if (postId == 0 || packageId == 0)
        {
            return BadRequest(new ApiResponse<bool> { Success = false, Message = "Invalid post ID or package ID" });
        }

        var apiResponse = await _boostPackageService.BuyBoostPackage(userId, postId, packageId);
        if (!apiResponse.Success)
        {
            return apiResponse.Message == "Package not found" ? NotFound(apiResponse) : BadRequest(apiResponse);
        }
        return Ok(apiResponse);
    }
}