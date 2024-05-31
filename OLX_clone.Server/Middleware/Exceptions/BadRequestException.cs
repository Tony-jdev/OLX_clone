namespace OLX_clone.Server.Middleware.Exceptions;

public class BadRequestException : Exception
{
    public BadRequestException(string message) : base(message) { }
}