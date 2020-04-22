using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Exceptions.HttpExceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Events.Commands.AttendEvent
{
    public class AttendEventHandler : IRequestHandler<AttendEventCommand>
    {
        private readonly IEventPlannerDbContext _context;
        private readonly IUserService _userService;

        public AttendEventHandler(IEventPlannerDbContext context, IUserService userService)
            => (_context, _userService) = (context, userService);

        public async Task<Unit> Handle(AttendEventCommand request, CancellationToken cancellationToken)
        {
            var targetEvent = await _context.Events.FindAsync(request.Id)
                ?? throw new NotFoundException("Event does not exist.");

            var user = await _userService.GetCurrentUserAsync()
                ?? throw new BadRequestException("You need an account to attend events.");

            var attendance = await _context.UserEvents.FindAsync(user.Id, targetEvent.Id);

            if (attendance != null)
            {
                throw new BadRequestException("You are already attending this event.");
            }

            attendance = new UserEvent
            {
                AppUserId = user.Id,
                EventId = targetEvent.Id,
                DateJoined = DateTime.Now,
                IsHost = false
            };

            _context.UserEvents.Add(attendance);

            var hasSucceeded = await _context.SaveChangesAsync(cancellationToken) > 0;

            if (!hasSucceeded)
                throw new PersistenceException();

            return Unit.Value;
        }
    }
}
