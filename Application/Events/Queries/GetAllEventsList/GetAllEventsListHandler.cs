using System.Collections.Generic;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Common.Models.DTOs;
using AutoMapper;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Events.Queries.GetAllEventsList
{
    public class GetAllEventsListHandler : IRequestHandler<GetAllEventsListQuery, IList<EventDto>>
    {
        private readonly IEventPlannerDbContext _context;
        private readonly IMapper _mapper;

        public GetAllEventsListHandler(IEventPlannerDbContext context, IMapper mapper)
            => (_context, _mapper) = (context, mapper);

        public async Task<IList<EventDto>> Handle(GetAllEventsListQuery request, CancellationToken cancellationToken)
        {
            var events = await _context.Events.ToListAsync(cancellationToken);

            return _mapper.Map<List<Event>, List<EventDto>>(events);
        }
    }
}
