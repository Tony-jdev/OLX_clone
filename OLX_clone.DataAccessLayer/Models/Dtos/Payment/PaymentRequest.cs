using System.ComponentModel.DataAnnotations;

namespace OLX_clone.DataAccessLayer.Models.Dtos.Payment;

public class PaymentRequest
{
    [Required]
    public string UserId { get; set; }
    
    [Required]
    [Range(0.01, double.MaxValue, ErrorMessage = "Amount must be greater than zero.")]
    public double Amount { get; set; }
    public string Token { get; set; }
}