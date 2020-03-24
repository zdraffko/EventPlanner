using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using MediatR;

namespace Application.Events.Commands.DeleteEvent
{
    public class DeleteEventHandler : IRequestHandler<DeleteEventCommand>
    {
        private readonly IEventPlannerDbContext _context;

        public DeleteEventHandler(IEventPlannerDbContext context) => _context = context;

        public async Task<Unit> Handle(DeleteEventCommand request, CancellationToken cancellationToken)
        {
            var targetEvent = await _context.Events.FindAsync(request.Id);

            _context.Events.Remove(targetEvent);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
