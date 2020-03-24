using System.Threading;
using System.Threading.Tasks;
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
            var targetEvent = await _context.Events.FindAsync(request.Id);

            targetEvent.Title = request.Title ?? targetEvent.Title;
            targetEvent.Description = request.Description ?? targetEvent.Description;
            targetEvent.Category = request.Category ?? targetEvent.Category;
            targetEvent.Date = request.Date ?? targetEvent.Date;
            targetEvent.City = request.City ?? targetEvent.City;
            targetEvent.Venue = request.Venue ?? targetEvent.Venue;

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
