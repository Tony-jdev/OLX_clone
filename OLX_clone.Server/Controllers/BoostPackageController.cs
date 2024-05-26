using Microsoft.AspNetCore.Mvc;
using OLX_clone.Server.Helpers;
using OLX_clone.Server.Models;
using OLX_clone.Server.Models.Dtos;
using OLX_clone.Server.Models.Dtos.BoostPackage;
using OLX_clone.Server.Services.BoostService;

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
    public async Task<ActionResult<ApiResponse<BoostPackage>>> CreateBoostPackage(CreateBoostPackageDto boostPackageCreateDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new ApiResponse<BoostPackage> { Success = false, Message = "Model is invalid" });
        }

        try
        {
            var apiResponse = await _boostPackageService.CreateBoostPackage(boostPackageCreateDto);
            if (!apiResponse.Success)
            {
                return BadRequest(apiResponse);
            }
            return Ok(apiResponse);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ApiResponse<BoostPackage> { Success = false, Message = ex.Message });
        }
    }

    [HttpPut("{id:int}")]
    //[Authorize(Roles = SD.Role_Admin)]
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

        try
        {
            var apiResponse = await _boostPackageService.UpdateBoostPackage(id, boostPackageUpdateDto);
            if (!apiResponse.Success)
            {
                return BadRequest(apiResponse);
            }
            return Ok(apiResponse);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ApiResponse<BoostPackage> { Success = false, Message = ex.Message });
        }
    }

    [HttpDelete("{id:int}")]
    //[Authorize(Roles = SD.Role_Admin)]
    public async Task<ActionResult<ApiResponse<bool>>> DeleteBoostPackage(int id)
    {
        if (id == 0)
        {
            return BadRequest(new ApiResponse<bool> { Success = false, Message = "Invalid package ID" });
        }

        try
        {
            var apiResponse = await _boostPackageService.DeleteBoostPackage(id);
            if (!apiResponse.Success)
            {
                return apiResponse.Message == "Package not found" ? NotFound(apiResponse) : BadRequest(apiResponse);
            }
            return Ok(apiResponse);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ApiResponse<bool> { Success = false, Message = ex.Message });
        }
    }

    [HttpPost("{postId}/purchase")]
    public async Task<ActionResult<ApiResponse<bool>>> PurchaseBoostPackage(string userId, int postId, int packageId)
    {
        if (postId == 0 || packageId == 0)
        {
            return BadRequest(new ApiResponse<bool> { Success = false, Message = "Invalid post ID or package ID" });
        }

        try
        {
            var apiResponse = await _boostPackageService.BuyBoostPackage(userId, postId, packageId);
            if (!apiResponse.Success)
            {
                return apiResponse.Message == "Package not found" ? NotFound(apiResponse) : BadRequest(apiResponse);
            }
            return Ok(apiResponse);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ApiResponse<bool> { Success = false, Message = ex.Message });
        }
    }
}