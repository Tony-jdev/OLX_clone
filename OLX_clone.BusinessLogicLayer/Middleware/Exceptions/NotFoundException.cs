namespace OLX_clone.BusinessLogicLayer.Middleware.Exceptions;

public class NotFoundException : Exception
{
    public NotFoundException(string message) : base(message) { }
}