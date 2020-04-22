using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Exceptions.HttpExceptions;
using Application.Common.Interfaces;
using MediatR;

namespace Application.Events.Commands.UnAttendEvent
{
    public class UnAttendEventHandler : IRequestHandler<UnAttendEventCommand>
    {
        private readonly IEventPlannerDbContext _context;
        private readonly IUserService _userService;

        public UnAttendEventHandler(IEventPlannerDbContext context, IUserService userService)
            => (_context, _userService) = (context, userService);

        public async Task<Unit> Handle(UnAttendEventCommand request, CancellationToken cancellationToken)
        {
            var targetEvent = await _context.Events.FindAsync(request.Id)
                              ?? throw new NotFoundException("Event does not exist.");

            var user = await _userService.GetCurrentUserAsync()
                       ?? throw new BadRequestException("You need an account to interact with events.");

            var attendance = await _context.UserEvents.FindAsync(user.Id, targetEvent.Id)
                ?? throw new BadRequestException("You are already not attending this event.");

            if (attendance.IsHost)
            {
                throw new BadRequestException("The host can not cancel his attendance.");
            }

            _context.UserEvents.Remove(attendance);

            var hasSucceeded = await _context.SaveChangesAsync(cancellationToken) > 0;

            if (!hasSucceeded)
                throw new PersistenceException();

            return Unit.Value;
        }
    }
}
