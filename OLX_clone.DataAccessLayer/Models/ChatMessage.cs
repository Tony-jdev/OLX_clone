using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OLX_clone.DataAccessLayer.Models;

public class ChatMessage
{
    [Key]
    public int Id { get; set; }
    
    public int ChatId { get; set; }
    [ForeignKey("ChatId")]
    public Chat Chat { get; set; }
    
    [Required]
    public string SenderId { get; set; }
    [ForeignKey("SenderId")]
    public ApplicationUser Sender { get; set; }
    
    [Required]
    public string ReceiverId { get; set; }
    [ForeignKey("ReceiverId")]
    public ApplicationUser Receiver { get; set; }
    
    [Required]
    public string Text { get; set; }
    public DateTime CreatedAt{ get; set; } = DateTime.Now;

    public bool IsRead { get; set; } = false;
}