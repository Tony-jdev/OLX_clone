using System.ComponentModel.DataAnnotations;

namespace OLX_clone.Server.Models.Dtos.Category;

public class CreateCategoryDto
{
    [Required]
    public string Title { get; set; }
}