namespace OLX_clone.BusinessLogicLayer.Middleware.Exceptions;

public class BadRequestException : Exception
{
    public BadRequestException(string message) : base(message) { }
}