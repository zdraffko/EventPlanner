using System.Net;

namespace Application.Common.Exceptions.HttpExceptions
{
    public class UnauthorizedException : HttpException
    {
        private const string DefaultExceptionMessage = "The requested resource requires authentication.";

        public UnauthorizedException(string message = DefaultExceptionMessage) : base(message) { }

        public override HttpStatusCode StatusCode { get; } = HttpStatusCode.Unauthorized;
    }
}
