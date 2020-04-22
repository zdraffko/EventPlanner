using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions.HttpExceptions;
using Application.Common.Interfaces;
using Application.Common.Models.DTOs;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Events.Queries.GetEvent
{
    public class GetEventHandler : IRequestHandler<GetEventQuery, EventDto>
    {
        private readonly IEventPlannerDbContext _context;
        private readonly IMapper _mapper;

        public GetEventHandler(IEventPlannerDbContext context, IMapper mapper)
            => (_context, _mapper) = (context, mapper);

        public async Task<EventDto> Handle(GetEventQuery request, CancellationToken cancellationToken)
        {
            var targetEvent = await _context.Events.FindAsync(request.Id)
                ?? throw new NotFoundException();

            return _mapper.Map<Event, EventDto>(targetEvent);
        }
    }
}
