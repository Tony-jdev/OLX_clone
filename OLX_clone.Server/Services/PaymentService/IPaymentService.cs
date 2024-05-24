using OLX_clone.Server.Helpers;
using OLX_clone.Server.Models.Dtos.Payment;
using Stripe;

namespace OLX_clone.Server.Services.PaymentService;

public interface IPaymentService
{
    Task<Charge> CreateCharge(PaymentRequest paymentRequest);
}