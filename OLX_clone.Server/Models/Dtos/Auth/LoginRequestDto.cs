using System.ComponentModel.DataAnnotations;

namespace OLX_clone.Server.Models.Dtos.Auth;

public class LoginRequestDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string Password { get; set; }
}