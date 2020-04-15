using FluentValidation;

namespace Application.Users.Queries.LogIn
{
    public class LogInValidator : AbstractValidator<LogInQuery>
    {
        public LogInValidator()
        {
            RuleFor(query => query.Email)
                .NotEmpty().WithMessage("An email was not provided.")
                .EmailAddress().WithMessage("The provided email is not valid.");

            RuleFor(query => query.Password)
                .NotEmpty().WithMessage("A password was not provided.");
        }
    }
}
