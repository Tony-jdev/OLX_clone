using OLX_clone.DataAccessLayer.Models.Dtos.Payment;
using Stripe;

namespace OLX_clone.BusinessLogicLayer.Services.Contracts;

public interface IPaymentService
{
    Task<Charge> CreateCharge(PaymentRequest paymentRequest);
}