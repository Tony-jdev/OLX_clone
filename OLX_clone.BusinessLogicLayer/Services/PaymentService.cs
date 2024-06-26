﻿using Microsoft.Extensions.Configuration;
using OLX_clone.BusinessLogicLayer.Services.Contracts;
using OLX_clone.DataAccessLayer.Models.Dtos.Payment;
using Stripe;

namespace OLX_clone.BusinessLogicLayer.Services;

public class PaymentService: IPaymentService
{
    private readonly IConfiguration _configuration;

    public PaymentService(IConfiguration configuration)
    {
        _configuration = configuration;
        StripeConfiguration.ApiKey = _configuration["StripeSettings:SecretKey"];
    }
    
    public async Task<Charge> CreateCharge(PaymentRequest paymentRequest)
    {
        var options = new ChargeCreateOptions
        {
            Amount = (int)(paymentRequest.Amount * 100),
            Currency = "uah",
            Source = paymentRequest.Token,
            Description = "Payment for account replenishment",
            Metadata = new Dictionary<string, string>
            {
                { "UserId", paymentRequest.UserId }
            }
        };
        var service = new ChargeService();
        var charge = await service.CreateAsync(options);

        return charge;
    }
}