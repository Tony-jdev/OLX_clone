namespace OLX_clone.Server.Models.Dtos.Auth;

public class RegisterRequestDto
{
    public string Name { get; set; }
    public string Surname { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
}