namespace OLX_clone.BusinessLogicLayer.Middleware.Exceptions;

public class InternalServerErrorException : Exception
{
    public InternalServerErrorException(string message) : base(message) { }
}