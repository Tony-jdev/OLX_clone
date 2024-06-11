namespace OLX_clone.DataAccessLayer.Models.Dtos.Category;

public class GetCategoryDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string SKU { get; set; }
    public int ParentId { get; set; }
}