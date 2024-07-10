namespace OLX_clone.BusinessLogicLayer.Services.Contracts;

public interface IEmailService
{
    Task SendEmailAsync(string to, string subject, string htmlMessage);
}