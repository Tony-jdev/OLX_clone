namespace OLX_clone.DataAccessLayer.Models.Dtos.User;

public class GetApplicationUserChatDto
{
    public string Id{ get; set; }
    public string ProfilePhotoUrl { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public DateTime LastSeenOnline { get; set; }
    public bool isOnline { get; set; }
}