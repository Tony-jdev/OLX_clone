using System.ComponentModel.DataAnnotations;

namespace OLX_clone.DataAccessLayer.Models.Dtos.Auth;

public class RegisterRequestDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [MinLength(8, ErrorMessage = "Password must be at least 8 characters long.")]
    public string Password { get; set; }
}