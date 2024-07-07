namespace OLX_clone.DataAccessLayer.Models.Dtos.User;

public class GetApplicationUserDto
{
    public string Id{ get; set; }
    public string ProfilePhotoUrl { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public string PhoneNumber { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime LastSeenOnline { get; set; }
    public bool isOnline { get; set; }
}