using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using OLX_clone.BusinessLogicLayer.Middleware.Exceptions;
using OLX_clone.DataAccessLayer.Helpers;

namespace OLX_clone.BusinessLogicLayer.Middleware;

public class GlobalExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionHandlingMiddleware> _logger;

    public GlobalExceptionHandlingMiddleware(RequestDelegate next, ILogger<GlobalExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        _logger.LogError(exception, exception.Message);

        var code = HttpStatusCode.InternalServerError;

        switch (exception)
        {
            case NotFoundException _:
                code = HttpStatusCode.NotFound;
                break;
            case BadRequestException _:
                code = HttpStatusCode.BadRequest;
                break;
            default:
                code = HttpStatusCode.InternalServerError;
                break;
        }

        var result = JsonConvert.SerializeObject(new ApiResponse<bool>
        {
            Success = false,
            Message = exception.Message,
            Data = default(bool)
        });
        
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)code;

        return context.Response.WriteAsync(result);
    }
}

