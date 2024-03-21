using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace OLX_clone.Server.Models;

public class ApplicationUser: IdentityUser
{
    [Required]
    public string Name { get; set; }
    [Required]
    public string Surname { get; set; }
}