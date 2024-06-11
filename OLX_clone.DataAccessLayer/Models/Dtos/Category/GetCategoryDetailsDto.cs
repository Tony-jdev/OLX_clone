namespace OLX_clone.DataAccessLayer.Models.Dtos.Category;

public class GetCategoryDetailsDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string SKU { get; set; }
    public int ParentId { get; set; }
    
    public ICollection<GetCategoryDto> ChildCategories { get; set; }
}