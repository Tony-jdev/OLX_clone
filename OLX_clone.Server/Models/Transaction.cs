using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OLX_clone.Server.Models;

public class Transaction
{
    [Key]
    public int Id { get; set; }
    
    public string UserId { get; set; }
    [ForeignKey("UserId")]
    public ApplicationUser User { get; set; }

    public double Amount { get; set; }

    public DateTime Timestamp { get; set; } = DateTime.Now;
    
    [Column(TypeName = "nvarchar(50)")]
    public TransactionType Type { get; set; } = TransactionType.Deposit;
}

public enum TransactionType
{
    Deposit,
    AdvertisementPayment 
}