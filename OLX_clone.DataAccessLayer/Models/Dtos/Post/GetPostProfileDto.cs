namespace OLX_clone.DataAccessLayer.Models.Dtos.Post;

public class GetPostProfileDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string SKU { get; set; }
    public double Price { get; set; }
    public string Location { get; set; }
    public string Type { get; set; }
    public string Status { get; set; }
    public int ChatsCount { get; set; }
    public int FavoritesCount { get; set; }
    public int ViewsCount { get; set; }
    public bool IsTop { get; set; }
    public string PhotoUrl { get; set; }
}