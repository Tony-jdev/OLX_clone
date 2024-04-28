namespace OLX_clone.Server.Models.Dtos.Category;

public class GetCategoryDetailsDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public int ParentId { get; set; }
    
    public ICollection<GetCategoryDto> ChildCategories { get; set; }
}