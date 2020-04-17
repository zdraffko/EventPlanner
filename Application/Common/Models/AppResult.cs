namespace Application.Common.Models
{
    public class AppResult
    {
        private AppResult(bool succeeded, string error) => (Succeeded, Error) = (succeeded, error);

        internal bool Succeeded { get; }

        internal string Error { get; }

        public static AppResult Success() => new AppResult(true, null);

        public static AppResult Failure(string error) => new AppResult(false, error);
    }
}
