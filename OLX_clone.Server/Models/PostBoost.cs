using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OLX_clone.Server.Models;

public class PostBoost
{
    public int Id { get; set; }
    
    public int PostId { get; set; }
    [ForeignKey("PostId")]
    public Post Post { get; set; }
    
    public int NumberOfDays { get; set; }
        
    public int AvailableBoostsCount { get; set; }
    
    public DateTime? TopExpiryDate { get; set; }
    public DateTime? VipExpiryDate { get; set; }
}