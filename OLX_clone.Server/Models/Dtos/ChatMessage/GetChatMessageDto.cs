namespace OLX_clone.Server.Models.Dtos.ChatMessage;

public class GetChatMessageDto
{
    public int Id { get; set; }
    
    public int ChatId { get; set; }
    
    public string SenderId { get; set; }

    public string ReceiverId { get; set; }
    
    public string Text { get; set; }
    public DateTime CreatedAt{ get; set; }

    public bool IsRead { get; set; }
}