using System.Net;

namespace Application.Common.Exceptions.HttpExceptions
{
    public class BadRequestException : HttpException
    {
        private const string DefaultExceptionMessage = "There was a problem during the request.";

        public BadRequestException(string message = DefaultExceptionMessage) : base(message) { }

        public override HttpStatusCode StatusCode { get; } = HttpStatusCode.BadRequest;
    }
}
