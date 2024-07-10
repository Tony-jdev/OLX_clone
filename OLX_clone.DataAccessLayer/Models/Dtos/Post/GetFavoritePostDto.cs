using OLX_clone.DataAccessLayer.Models.Dtos.Category;

namespace OLX_clone.DataAccessLayer.Models.Dtos.Post;

public class GetFavoritePostDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string SKU { get; set; }
    public GetCategoryDto Category { get; set; }
    public double Price { get; set; }
    public string Location { get; set; }
    public string Type { get; set; }
    public string UserId { get; set; }
    public bool IsTop { get; set; }
    public string PhotoUrl { get; set; }
}