using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OLX_clone.Server.Models.Dtos.ChatMessage;

public class CreateChatMessageDto
{
    [Required]
    public int ChatId { get; set; }
    
    [Required]
    public string SenderId { get; set; }
    
    [Required]
    public string ReceiverId { get; set; }
    
    [Required]
    [StringLength(1000, ErrorMessage = "Message text can't be longer than 1000 characters.")]
    public string Text { get; set; }
}