using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Exceptions.HttpExceptions;
using Application.Common.Interfaces;
using MediatR;

namespace Application.Events.Commands.UpdateEvent
{
    public class UpdateEventHandler : IRequestHandler<UpdateEventCommand>
    {
        private readonly IEventPlannerDbContext _context;

        public UpdateEventHandler(IEventPlannerDbContext context) => _context = context;

        public async Task<Unit> Handle(UpdateEventCommand request, CancellationToken cancellationToken)
        {
            var targetEvent = await _context.Events.FindAsync(request.Id)
                              ?? throw new NotFoundException();

            targetEvent.Title = request.Title ?? targetEvent.Title;
            targetEvent.Description = request.Description ?? targetEvent.Description;
            targetEvent.Category = request.Category ?? targetEvent.Category;
            targetEvent.Date = request.Date ?? targetEvent.Date;
            targetEvent.City = request.City ?? targetEvent.City;
            targetEvent.Venue = request.Venue ?? targetEvent.Venue;

            var hasSucceeded = await _context.SaveChangesAsync(cancellationToken) > 0;

            if (!hasSucceeded)
                throw new PersistenceException();

            return Unit.Value;
        }
    }
}
