using Microsoft.AspNetCore.Mvc;
using OLX_clone.Server.Helpers;
using OLX_clone.Server.Models;
using OLX_clone.Server.Models.Dtos;
using OLX_clone.Server.Models.Dtos.BoostPackage;
using OLX_clone.Server.Services.BoostService;

namespace OLX_clone.Server.Controllers;

[ApiController]
[Route("api/boost-packages")]
public class BoostPackageController: ControllerBase
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
    public async Task<ActionResult<ApiResponse<Category>>> GetBoostPackage(int id)
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
        var apiResponse = new ApiResponse<BoostPackage>{ Success = false, Message = "Model is invalid" };
        try
        {
            if (ModelState.IsValid)
            {
                apiResponse = await _boostPackageService.CreateBoostPackage(boostPackageCreateDto);
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
    /*[Authorize(Roles = SD.Role_Admin)]*/
    public async Task<ActionResult<ApiResponse<BoostPackage>>> UpdateBoostPackage(int id,
        [FromForm] UpdateBoostPackageDto boostPackageUpdateDto)
    {
        var apiResponse = new ApiResponse<BoostPackage> { Success = false, Message = "Model is invalid" };
        try
        {
            if (ModelState.IsValid)
            {
                if (id != boostPackageUpdateDto.Id){
                    apiResponse.Message = "Wrong category";
                    return BadRequest(apiResponse);
                }

                apiResponse = await _boostPackageService.UpdateBoostPackage(id, boostPackageUpdateDto);
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
    /*[Authorize(Roles = SD.Role_Admin)]*/
    public async Task<ActionResult<ApiResponse<bool>>> DeleteBoostPackage(int id)
    {
        var apiResponse = new ApiResponse<bool> { Success = false, Message = "Model not found" };
        try
        {
            if (id == 0)
                return BadRequest(apiResponse);

            apiResponse = await _boostPackageService.DeleteBoostPackage(id);
            if (!apiResponse.Success && apiResponse.Message == "Package not found.")
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
    
    [HttpPost("{postId}/purchase")]
    public async Task<ActionResult<ApiResponse<bool>>> PurchaseBoostPackage(string userId, int postId, int packageId)
    {
        var apiResponse = new ApiResponse<bool> { Success = false, Message = "Model not found" };
        try
        {
            if (postId == 0 || packageId == 0)
                return BadRequest(apiResponse);

            apiResponse = await _boostPackageService.BuyBoostPackage(userId, postId, packageId);
            if (!apiResponse.Success && apiResponse.Message == "Package not found.")
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