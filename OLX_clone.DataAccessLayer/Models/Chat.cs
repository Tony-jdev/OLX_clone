using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OLX_clone.DataAccessLayer.Models;

public class Chat
{
    [Key]
    public int Id { get; set; }
    
    public int PostId { get; set; }
    [ForeignKey("PostId")]
    public Post Post { get; set; }
    
    [Required]
    public string CustomerId { get; set; }
    [ForeignKey("CustomerId")]
    public ApplicationUser Customer { get; set; }
    
    [Required]
    public string SellerId { get; set; }
    [ForeignKey("SellerId")]
    public ApplicationUser Seller { get; set; }
    
    public ICollection<ChatMessage> Messages { get; set; }
}