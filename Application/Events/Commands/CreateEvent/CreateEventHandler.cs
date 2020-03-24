using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Events.Commands.CreateEvent
{
    public class CreateEventHandler : IRequestHandler<CreateEventCommand, Guid>
    {
        private readonly IEventPlannerDbContext _context;

        public CreateEventHandler(IEventPlannerDbContext context) => _context = context;

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

            await _context.SaveChangesAsync(cancellationToken);

            return newEvent.Id;
        }
    }
}
