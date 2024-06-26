using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;
using OLX_clone.DataAccessLayer.Models.Enums;

namespace OLX_clone.DataAccessLayer.Models.Dtos.Post;

public class UpdatePostDto
{
    [Required]
    public int Id { get; set; }

    [Required]
    public string Title { get; set; }

    [Required]
    public string Description { get; set; }
    [Required]
    public string Location { get; set; }

    [Required]
    [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than zero.")]
    public double Price { get; set; }

    [Required]
    public PostType Type { get; set; }

    [Required]
    public int CategoryId { get; set; }

    public List<IFormFile>? Files { get; set; }
}