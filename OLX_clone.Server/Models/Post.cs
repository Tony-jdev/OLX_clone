using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using OLX_clone.Server.Helpers;

namespace OLX_clone.Server.Models;

public class Post
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Title { get; set; }
    [Required]
    public string Description { get; set; }
    [Required]
    public double Price { get; set; }
    [Required] 
    public string Status { get; set; } = SD.status_active;
    [Required]
    public string ApplicationUserId { get; set; }
    [ForeignKey("ApplicationUserId")]
    public ApplicationUser User { get; set; }
    public DateTime CreatedAt{ get; set; } = DateTime.Now;
    
    public ICollection<Category> Categories{ get; set; }
    public ICollection<PostView> PostViews{ get; set; }
}