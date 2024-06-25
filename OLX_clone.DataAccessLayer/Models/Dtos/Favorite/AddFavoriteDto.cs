using System.ComponentModel.DataAnnotations;

namespace OLX_clone.DataAccessLayer.Models.Dtos.Favorite;

public class AddFavoriteDto
{
    [Required]
    public int PostId { get; set; }

    [Required]
    public string ApplicationUserId { get; set; }
}