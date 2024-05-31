using System.ComponentModel.DataAnnotations;

namespace OLX_clone.Server.Models.Dtos.Category;

public class UpdateCategoryDto
{
    [Required]
    public int Id { get; set; }
    
    [Required]
    public string Title { get; set; }
    public int? ParentId { get; set; }
}