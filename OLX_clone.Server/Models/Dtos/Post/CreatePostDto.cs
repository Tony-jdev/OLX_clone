using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OLX_clone.Server.Models.Dtos.Post;

public class CreatePostDto
{
    [Required]
    public string Title { get; set; }
    [Required]
    public string Description { get; set; }
    [Required]
    public double Price { get; set; }
    [Required]
    public List<int> CategoriesId { get; set; }
    [Required]
    public string ApplicationUserId { get; set; }
    public List<IFormFile> Files { get; set; }
}