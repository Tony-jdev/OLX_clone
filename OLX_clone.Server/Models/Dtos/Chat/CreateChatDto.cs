using System.ComponentModel.DataAnnotations;

namespace OLX_clone.Server.Models.Dtos.Chat;

public class CreateChatDto
{
    [Required]
    public int PostId { get; set; }
    
    [Required]
    public string CustomerId { get; set; }
    
    [Required]
    public string SellerId { get; set; }
}