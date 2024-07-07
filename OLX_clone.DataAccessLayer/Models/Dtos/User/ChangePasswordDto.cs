using System.ComponentModel.DataAnnotations;

namespace OLX_clone.DataAccessLayer.Models.Dtos.User;

public class ChangePasswordDto
{
    [Required]
    public string UserId { get; set; }

    [Required]
    public string CurrentPassword { get; set; }

    [Required]
    public string NewPassword { get; set; }
}