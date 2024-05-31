namespace OLX_clone.Server.Middleware.Exceptions;

public class NotFoundException : Exception
{
    public NotFoundException(string message) : base(message) { }
}