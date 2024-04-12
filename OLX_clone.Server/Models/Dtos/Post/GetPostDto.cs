namespace OLX_clone.Server.Models.Dtos.Post;

public class GetPostDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public double Price { get; set; }
    public string Status { get; set; }
    public string PhotoUrl { get; set; }
}