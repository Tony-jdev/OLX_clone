using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OLX_clone.DataAccessLayer.Models;

public class PostView
{
    [Key]
    public int Id { get; set; }
    
    [Required]
    public int PostId { get; set; }
    
    [ForeignKey("PostId")]
    public Post Post { get; set; }
    
    public DateTime ViewedAt{ get; set; }=DateTime.Now;
}