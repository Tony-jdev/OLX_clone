using System.ComponentModel.DataAnnotations;

namespace OLX_clone.DataAccessLayer.Models.Dtos.Auth;

public class ForgotPasswordDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }
}