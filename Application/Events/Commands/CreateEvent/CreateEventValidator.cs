using FluentValidation;

namespace Application.Events.Commands.CreateEvent
{
    public class CreateEventValidator : AbstractValidator<CreateEventCommand>
    {
        public CreateEventValidator()
        {
            RuleFor(command => command.Title)
                .NotEmpty().WithMessage("Title is required.")
                .MaximumLength(100).WithMessage("The title must not exceed 100 characters.");

            RuleFor(command => command.Description)
                .NotEmpty().WithMessage("Description is required.")
                .MaximumLength(1000).WithMessage("The description must not exceed 1000 characters.");

            RuleFor(command => command.Category)
                .NotEmpty().WithMessage("Category is required.");

            RuleFor(command => command.Date)
                .NotEmpty().WithMessage("Date is required.");

            RuleFor(command => command.City)
                .NotEmpty().WithMessage("City is required.")
                .MaximumLength(100).WithMessage("The city name must not exceed 100 characters.");

            RuleFor(command => command.Venue)
                .NotEmpty().WithMessage("Venue is required.")
                .MaximumLength(100).WithMessage("The venue name must not exceed 100 characters.");
        }
    }
}
