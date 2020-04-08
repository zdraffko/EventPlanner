using System;

namespace Application.Common.Exceptions
{
    public class PersistenceException : Exception
    {
        private const string DefaultExceptionMessage = "An error has occurred while saving changes";

        public PersistenceException(string message = DefaultExceptionMessage) : base(message) { }
    }
}
