using FluentValidation;

namespace Application.Common.Extensions
{
    public static class ValidatorExtensions
    {
        public static IRuleBuilder<T, string> Password<T>(this IRuleBuilder<T, string> builder)
            => builder
                .NotEmpty().WithMessage("A password was not provided.")
                .MinimumLength(6).WithMessage("Password must be at least 6 characters.")
                .Matches("[A-Z]").WithMessage("Password must contain at least 1 uppercase letter.")
                .Matches("[a-z]").WithMessage("Password must contain at least 1 lowercase letter.")
                .Matches("[0-9]").WithMessage("Password must contain a number.")
                .Matches("[^A-Za-z0-9]").WithMessage("Password must contain at least 1 non alphanumeric character.");
    }
}
