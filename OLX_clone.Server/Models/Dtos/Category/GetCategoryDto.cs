using System.ComponentModel.DataAnnotations;

namespace OLX_clone.Server.Models.Dtos.Category;

public class GetCategoryDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public int ParentId { get; set; }
}