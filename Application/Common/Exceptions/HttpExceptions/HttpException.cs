using System;
using System.Net;

namespace Application.Common.Exceptions.HttpExceptions
{
    public abstract class HttpException : Exception
    {
        protected HttpException(string message) : base(message) { }

        public abstract HttpStatusCode StatusCode { get; }
    }
}
