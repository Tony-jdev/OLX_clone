using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OLX_clone.Server.Models.Dtos.Post;

public class UpdatePostDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public double Price { get; set; }
    public string Type { get; set; }
    public int CategoryId { get; set; }
    public string Status{ get; set; }
    
    public List<IFormFile>? Files { get; set; }
}