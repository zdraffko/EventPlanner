using System;
using Domain.Entities;
using MediatR;

namespace Application.Events.Queries.GetEvent
{
    public class GetEventQuery : IRequest<Event>
    {
        public Guid Id { get; set; }
    }
}
