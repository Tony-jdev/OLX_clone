using OLX_clone.DataAccessLayer.Models.Dtos.Post;
using OLX_clone.DataAccessLayer.Models.Enums;

namespace OLX_clone.DataAccessLayer.Models.Dtos.User;

public class GetApplicationUserDetailsDto
{
    public string UserId { get; set; }
    public string Email { get; set; }
    public string ProfilePhotoUrl { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public string PhoneNumber { get; set; }
    
    public DateTime DateOfBirth { get; set; }
    public Gender Gender { get; set; }
    public MaritalStatus MaritalStatus { get; set; }
    public bool HasChildren { get; set; }
    public bool HasPets { get; set; }
    public bool IsStudying { get; set; }
    public bool IsWorking { get; set; }
    public ICollection<GetPostProfileDto> Posts { get; set; }
}