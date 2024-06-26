using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using OLX_clone.DataAccessLayer.Helpers;
using OLX_clone.DataAccessLayer.Models.Enums;

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
    public string Location { get; set; }

    [Required]
    public double Price { get; set; }
    [Required]
    public PostType Type { get; set; }
    
    [Required] public PostStatus Status { get; set; } = PostStatus.Active;

    [Required]
    public string ApplicationUserId { get; set; }

    [ForeignKey("ApplicationUserId")]
    public ApplicationUser User { get; set; }
    
    public bool IsTop { get; set; }
    public bool IsVip { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now;
    

    public ICollection<PostView> PostViews { get; set; }
}
