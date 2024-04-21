using OLX_clone.Server.Models.Dtos.ChatMessage;

namespace OLX_clone.Server.Models.Dtos.Chat;

public class GetChatDto
{
    public int Id { get; set; }
    public int PostId { get; set; }
    public string CustomerId { get; set; }
    public string SellerId { get; set; }
    
    public GetChatMessageDto LatestMessage { get; set; }
}