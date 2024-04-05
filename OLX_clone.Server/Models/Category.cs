using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace OLX_clone.Server.Models;

public class Category
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Title { get; set; }
    [JsonIgnore]
    public ICollection<Post> Posts { get; set; }
}