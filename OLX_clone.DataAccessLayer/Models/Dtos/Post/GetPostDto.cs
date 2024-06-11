namespace OLX_clone.DataAccessLayer.Models.Dtos.Post;

public class GetPostDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string SKU { get; set; }
    public double Price { get; set; }
    public string Type { get; set; }
    public bool IsTop { get; set; }
    public string PhotoUrl { get; set; }
}