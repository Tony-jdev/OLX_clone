using OLX_clone.DataAccessLayer.Models.Enums;

namespace OLX_clone.DataAccessLayer.Models.Dtos.Post;

public class UpdatePostStatusDto
{
    public PostStatus NewStatus { get; set; }
}