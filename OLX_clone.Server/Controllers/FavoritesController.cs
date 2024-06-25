using Microsoft.AspNetCore.Mvc;
using OLX_clone.BusinessLogicLayer.Services.Contracts;
using OLX_clone.DataAccessLayer.Models.Dtos.Favorite;

namespace OLX_clone.Server.Controllers;

[ApiController]
[Route("api/favorites")]
public class FavoriteController : ControllerBase
{
    private readonly IFavoriteService _favoriteService;

    public FavoriteController(IFavoriteService favoriteService)
    {
        _favoriteService = favoriteService;
    }

    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetFavoritesByUserId(string userId)
    {
        var result = await _favoriteService.GetFavoritesByUserIdAsync(userId);
        if (!result.Success)
        {
            return BadRequest(result);
        }

        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> AddFavorite([FromBody] AddFavoriteDto addFavoriteDto)
    {
        var result = await _favoriteService.AddFavoriteAsync(addFavoriteDto);
        if (!result.Success)
        {
            return BadRequest(result);
        }

        return Ok(result);
    }

    [HttpDelete("{favoriteId}")]
    public async Task<IActionResult> RemoveFavorite(int favoriteId)
    {
        var result = await _favoriteService.RemoveFavoriteAsync(favoriteId);
        if (!result.Success)
        {
            return BadRequest(result);
        }

        return Ok(result);
    }
}