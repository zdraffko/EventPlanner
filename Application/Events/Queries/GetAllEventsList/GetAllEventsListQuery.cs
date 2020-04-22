using System.Collections.Generic;
using Application.Common.Models.DTOs;
using MediatR;

namespace Application.Events.Queries.GetAllEventsList
{
    public class GetAllEventsListQuery : IRequest<IList<EventDto>> { }
}
