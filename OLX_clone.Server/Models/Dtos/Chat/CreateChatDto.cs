namespace OLX_clone.Server.Models.Dtos.Chat;

public class CreateChatDto
{
    public int PostId { get; set; }
    public string CustomerId { get; set; }
    public string SellerId { get; set; }
}