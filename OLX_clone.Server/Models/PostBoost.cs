using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OLX_clone.Server.Models;

public class PostBoost
{
    [Key]
    public int Id { get; set; }
    
    [Required]
    public int PostId { get; set; }

    [ForeignKey("PostId")]
    public Post Post { get; set; }

    [Required]
    public int NumberOfDays { get; set; }

    [Required]
    public int AvailableBoostsCount { get; set; }

    public DateTime? TopExpiryDate { get; set; }
    public DateTime? VipExpiryDate { get; set; }
}