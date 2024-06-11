using OLX_clone.DataAccessLayer.Models.Dtos.ChatMessage;

namespace OLX_clone.DataAccessLayer.Models.Dtos.Chat;

public class GetChatDto
{
    public int Id { get; set; }
    public int PostId { get; set; }
    public string CustomerId { get; set; }
    public string SellerId { get; set; }
    
    public GetChatMessageDto LatestMessage { get; set; }
}