using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OLX_clone.DataAccessLayer.Models;

public class BoostPackage
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than zero.")]
    public double Price { get; set; }

    [Required]
    public int BoostCount { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public BoostType Type { get; set; }

    [Required]
    public int NumberOfDays { get; set; }
    
    public int TopDurationInDays { get; set; }
    
    public int VipDurationInDays { get; set; }
}


public enum BoostType
{
    Top,
    Vip
}