using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace OLX_clone.DataAccessLayer.Models;

public class PostPhoto
{
    [Key]
    public int Id { get; set; }
    
    [Required]
    public int PostId { get; set; }
    
    [ForeignKey("PostId")]
    [JsonIgnore]
    public Post Post { get; set; }
    
    [Required]
    public string PhotoUrl { get; set; }
}