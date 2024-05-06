using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OLX_clone.Server.Models.Dtos.Post;

public class CreatePostDto
{
    public string Title { get; set; }
    
    public string Description { get; set; }
    public string Type { get; set; }
    
    public double Price { get; set; }
    
    public int CategoryId { get; set; }
    
    public string ApplicationUserId { get; set; }
    public List<IFormFile> Files { get; set; }
}