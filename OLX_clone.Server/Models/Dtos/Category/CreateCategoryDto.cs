using System.ComponentModel.DataAnnotations;

namespace OLX_clone.Server.Models.Dtos;

public class CreateCategoryDto
{
    [Required]
    public string Title { get; set; }
}