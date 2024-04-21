using System.ComponentModel.DataAnnotations.Schema;

namespace OLX_clone.Server.Models.Dtos.ChatMessage;

public class CreateChatMessageDto
{
    public int ChatId { get; set; }
    public string SenderId { get; set; }
    public string ReceiverId { get; set; }
    public string Text { get; set; }
}