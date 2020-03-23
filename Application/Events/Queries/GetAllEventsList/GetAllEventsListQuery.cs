using System.Collections.Generic;
using Domain.Entities;
using MediatR;

namespace Application.Events.Queries.GetAllEventsList
{
    public class GetAllEventsListQuery : IRequest<IList<Event>> { }
}
