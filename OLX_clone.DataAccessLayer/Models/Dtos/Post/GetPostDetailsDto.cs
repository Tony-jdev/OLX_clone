using OLX_clone.DataAccessLayer.Models.Dtos.Category;
using OLX_clone.DataAccessLayer.Models.Dtos.User;

namespace OLX_clone.DataAccessLayer.Models.Dtos.Post;

public class GetPostDetailsDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public double Price { get; set; }
    public string Location { get; set; }
    public string Type { get; set; }
    public bool IsTop { get; set; }
    public int ViewsCount { get; set; }
    public GetCategoryDto Category { get; set; }
    public List<PostPhoto> Photos { get; set; }
    public GetApplicationUserDto User { get; set; }
    public DateTime CreatedAt{ get; set; }
}