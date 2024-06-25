using OLX_clone.DataAccessLayer.Models.Dtos.Post;

namespace OLX_clone.DataAccessLayer.Models.Dtos.Favorite;

public class GetFavoriteDto
{
    public int Id { get; set; }
    public GetPostDto Post { get; set; }
}