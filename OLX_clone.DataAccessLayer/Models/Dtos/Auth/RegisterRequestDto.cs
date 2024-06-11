using System.ComponentModel.DataAnnotations;

namespace OLX_clone.DataAccessLayer.Models.Dtos.Auth;

public class RegisterRequestDto
{
    [Required]
    [MinLength(3, ErrorMessage = "Name is too short.")]
    public string Name { get; set; }

    [Required]
    [MinLength(8, ErrorMessage = "Surname is too short.")]
    public string Surname { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [MinLength(8, ErrorMessage = "Password must be at least 8 characters long.")]
    public string Password { get; set; }
}