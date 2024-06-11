using System.ComponentModel.DataAnnotations;

namespace OLX_clone.DataAccessLayer.Models.Dtos.Category;

public class CreateCategoryDto
{
    [Required]
    public string Title { get; set; }
    public int? ParentId { get; set; }
}