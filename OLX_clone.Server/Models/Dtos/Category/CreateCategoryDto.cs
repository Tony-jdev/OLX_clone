using System.ComponentModel.DataAnnotations;

namespace OLX_clone.Server.Models.Dtos.Category;

public class CreateCategoryDto
{
    public string Title { get; set; }
    public int? ParentId { get; set; }
}