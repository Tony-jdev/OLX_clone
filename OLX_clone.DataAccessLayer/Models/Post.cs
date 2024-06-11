using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using OLX_clone.DataAccessLayer.Helpers;

namespace OLX_clone.DataAccessLayer.Models;

public class Post
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Title { get; set; }
    
    public string SKU { get; set; }
    
    [Required]
    public int CategoryId { get; set; }

    [ForeignKey("CategoryId")]
    public Category Category { get; set; }

    [Required]
    public string Description { get; set; }

    [Required]
    public double Price { get; set; }
    [Required]
    public string Type { get; set; }

    [Required] public string Status { get; set; } = SD.status_active;

    [Required]
    public string ApplicationUserId { get; set; }

    [ForeignKey("ApplicationUserId")]
    public ApplicationUser User { get; set; }
    
    public bool IsTop { get; set; }
    public bool IsVip { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now;
    

    public ICollection<PostView> PostViews { get; set; }
}
