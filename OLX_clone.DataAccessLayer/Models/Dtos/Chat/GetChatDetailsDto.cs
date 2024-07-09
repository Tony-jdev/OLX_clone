using OLX_clone.DataAccessLayer.Models.Dtos.ChatMessage;

namespace OLX_clone.DataAccessLayer.Models.Dtos.Chat;

public class GetChatDetailsDto
{
    public int Id { get; set; }
    
    public string Name { get; set; }
    public string PhotoUrl { get; set; }
    public string PostPrice { get; set; }
    
    public int PostId { get; set; }
    public string CustomerId { get; set; }
    public string SellerId { get; set; }
        
    public List<GetChatMessageDto> Messages { get; set; }
}