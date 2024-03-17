using System.ComponentModel.DataAnnotations;

namespace OLX_clone.Server.Models.Dtos;

public class UpdateCategoryDto
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Title { get; set; }
}