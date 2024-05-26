using System.ComponentModel.DataAnnotations;

namespace OLX_clone.Server.Models.Dtos.Auth;

public class RegisterRequestDto
{
    [Required]
    public string Name { get; set; }

    [Required]
    public string Surname { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [MinLength(6, ErrorMessage = "Password must be at least 6 characters long.")]
    public string Password { get; set; }
}