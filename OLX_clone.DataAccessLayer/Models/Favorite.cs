using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OLX_clone.DataAccessLayer.Models;

public class Favorite
{
    public int Id { get; set; }

    [Required]
    public string ApplicationUserId { get; set; }
    [ForeignKey("ApplicationUserId")]
    public ApplicationUser User { get; set; }

    [Required]
    public int PostId { get; set; }
    [ForeignKey("PostId")]
    public Post Post { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.Now;
}