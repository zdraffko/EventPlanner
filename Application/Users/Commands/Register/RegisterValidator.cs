﻿using Application.Common.Extensions;
using FluentValidation;

namespace Application.Users.Commands.Register
{
    public class RegisterValidator : AbstractValidator<RegisterCommand>
    {
        public RegisterValidator()
        {
            RuleFor(command => command.Username)
                .NotEmpty().WithMessage("A username was not provided.")
                .MaximumLength(20).WithMessage("Username must not exceed 20 characters.");

            RuleFor(command => command.Email)
                .NotEmpty().WithMessage("An email was not provided.")
                .EmailAddress().WithMessage("The provided email is not valid.");

            RuleFor(command => command.Password)
                .Password();
        }
    }
}
