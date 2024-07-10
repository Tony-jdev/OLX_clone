using Microsoft.AspNetCore.Mvc;
using OLX_clone.BusinessLogicLayer.Services.Contracts;

namespace OLX_clone.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmailTestController : ControllerBase
{
    private readonly IEmailService _emailService;

    public EmailTestController(IEmailService emailService)
    {
        _emailService = emailService;
    }

    // Endpoint для відправлення тестового емейлу
    [HttpGet("send-test-email")]
    public async Task<IActionResult> SendTestEmail()
    {
        string recipientEmail = "Popk_us26@student.itstep.org"; // Вкажіть адресу, на яку слід відправити тестовий лист
        string subject = "Test Email from ASP.NET Core";
        string message = "This is a test email sent by ASP.NET Core application to check SMTP configuration.";

        try
        {
            await _emailService.SendEmailAsync(recipientEmail, subject, message);
            return Ok("Test email has been sent successfully.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error sending email: {ex.Message}");
        }
    }
}