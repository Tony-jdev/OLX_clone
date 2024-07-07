using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using OLX_clone.DataAccessLayer.Models.Enums;

namespace OLX_clone.DataAccessLayer.Models;

public class ApplicationUser: IdentityUser
{
    public string? Name { get; set; }
    public string? Surname { get; set; }
    
    public string? Address { get; set; }
    
    public DateTime? DateOfBirth { get; set; }
    
    public Gender? Gender { get; set; }
    public string? ProfilePhotoUrl { get; set; }
    public double Balance { get; set; } = 0;
    
    public MaritalStatus? MaritalStatus { get; set; }
    public bool? HasChildren { get; set; }
    public bool? HasPets { get; set; }
    public bool? IsStudying { get; set; }
    public bool? IsWorking { get; set; }

    public bool Online { get; set; } = true;
    public DateTime LastSeenOnline { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
} 