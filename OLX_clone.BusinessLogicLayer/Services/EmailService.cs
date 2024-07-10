using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;
using OLX_clone.BusinessLogicLayer.Services.Contracts;

namespace OLX_clone.BusinessLogicLayer.Services;

public class EmailService : IEmailService
{
    private readonly SmtpClient _smtpClient;
    private readonly IConfiguration _configuration;

    public EmailService(IConfiguration configuration)
    {
        _configuration = configuration;
        _smtpClient = new SmtpClient
        {
            Host = _configuration.GetValue<string>("EmailSettings:MailServer"),
            Port = _configuration.GetValue<int>("EmailSettings:MailPort"),
            EnableSsl = true,
            Credentials = new NetworkCredential(
                _configuration["EmailSettings:Sender"],
                _configuration["EmailSettings:Password"])
        };
    }

    public async Task SendEmailAsync(string email, string subject, string message)
    {
        var mailMessage = new MailMessage
        {
            From = new MailAddress(_configuration["EmailSettings:Sender"], _configuration.GetValue<string>("EmailSettings:SenderName")),
            Subject = subject,
            Body = message,
            IsBodyHtml = true
        };
        mailMessage.To.Add(email);

        await _smtpClient.SendMailAsync(mailMessage);
    }
}