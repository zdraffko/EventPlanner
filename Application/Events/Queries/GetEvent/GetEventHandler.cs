using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions.HttpExceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Events.Queries.GetEvent
{
    public class GetEventHandler : IRequestHandler<GetEventQuery, Event>
    {
        private readonly IEventPlannerDbContext _context;

        public GetEventHandler(IEventPlannerDbContext context) => _context = context;

        public async Task<Event> Handle(GetEventQuery request, CancellationToken cancellationToken)
            => await _context.Events.FindAsync(request.Id) ?? throw new NotFoundException();
    }
}
