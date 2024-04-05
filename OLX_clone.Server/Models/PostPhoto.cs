using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace OLX_clone.Server.Models;

public class PostPhoto
{
    [Key]
    public int Id { get; set; }
    [Required]
    [ForeignKey("PostId")]
    public int PostId { get; set; }
    [JsonIgnore]
    public Post Post { get; set; }
    [Required]
    public string PhotoUrl { get; set; }
}