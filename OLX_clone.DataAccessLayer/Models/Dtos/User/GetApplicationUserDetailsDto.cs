using OLX_clone.DataAccessLayer.Models.Dtos.Post;

namespace OLX_clone.DataAccessLayer.Models.Dtos.User;

public class GetApplicationUserDetailsDto
{
    public string UserId { get; set; }
    public string Email { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public string PhoneNumber { get; set; }
    public ICollection<GetPostDto> Posts { get; set; }
}