using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Exceptions.HttpExceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Events.Commands.CreateEvent
{
    public class CreateEventHandler : IRequestHandler<CreateEventCommand, Guid>
    {
        private readonly IEventPlannerDbContext _context;
        private readonly IUserService _userService;

        public CreateEventHandler(IEventPlannerDbContext context, IUserService userService)
            => (_context, _userService) = (context, userService);

        public async Task<Guid> Handle(CreateEventCommand request, CancellationToken cancellationToken)
        {
            var newEvent = new Event
            {
                Id = Guid.NewGuid(),
                Title = request.Title,
                Description = request.Description,
                Category = request.Category,
                Date = request.Date,
                City = request.City,
                Venue = request.Venue
            };

            _context.Events.Add(newEvent);

            var user = await _userService.GetCurrentUserAsync()
                ?? throw new BadRequestException("You need to have an account to create events.");

            var attendee = new UserEvent
            {
                AppUserId = user.Id,
                EventId = newEvent.Id,
                DateJoined = DateTime.Now,
                IsHost = true
            };

            _context.UserEvents.Add(attendee);

            var hasSucceeded = await _context.SaveChangesAsync(cancellationToken) > 0;

            if (!hasSucceeded)
                throw new PersistenceException();

            return newEvent.Id;
        }
    }
}
