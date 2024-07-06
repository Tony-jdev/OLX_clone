namespace OLX_clone.DataAccessLayer.Models.Dtos.User;

public class UpdateApplicationUserDto
{
    public string Id { get; set; }
    public string? Name { get; set; }
    public string? Surname { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Address { get; set; }
}