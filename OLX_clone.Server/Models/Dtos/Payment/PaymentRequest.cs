namespace OLX_clone.Server.Models.Dtos.Payment;

public class PaymentRequest
{
    public string UserId { get; set; }
    public double Amount { get; set; }
    public string Token { get; set; }
}