using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace OLX_clone.DataAccessLayer.Models;

public class ApplicationUser: IdentityUser
{
    [Required]
    public string Name { get; set; }
    [Required]
    public string Surname { get; set; }

    public double Balance { get; set; } = 0;

    public bool Online { get; set; } = true;
    
    public DateTime LastSeenOnline { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.Now;
} 