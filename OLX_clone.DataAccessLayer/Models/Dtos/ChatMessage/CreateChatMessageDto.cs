using System.ComponentModel.DataAnnotations;

namespace OLX_clone.DataAccessLayer.Models.Dtos.ChatMessage;

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