using System.Collections.Generic;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Events.Queries.GetAllEventsList
{
    public class GetAllEventsListHandler : IRequestHandler<GetAllEventsListQuery, IList<Event>>
    {
        private readonly IEventPlannerDbContext _context;

        public GetAllEventsListHandler(IEventPlannerDbContext context) => _context = context;

        public async Task<IList<Event>> Handle(GetAllEventsListQuery request, CancellationToken cancellationToken)
            => await _context.Events.ToListAsync(cancellationToken);
    }
}
