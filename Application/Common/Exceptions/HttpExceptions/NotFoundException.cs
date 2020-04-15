using System.Net;

namespace Application.Common.Exceptions.HttpExceptions
{
    public class NotFoundException : HttpException
    {
        private const string DefaultExceptionMessage = "The requested event does not exist.";

        public NotFoundException(string message = DefaultExceptionMessage) : base(message) { }

        public override HttpStatusCode StatusCode { get; } = HttpStatusCode.NotFound;
    }
}
