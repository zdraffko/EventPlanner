using System;
using Application.Common.Models.DTOs;
using MediatR;

namespace Application.Events.Queries.GetEvent
{
    public class GetEventQuery : IRequest<EventDto>
    {
        public Guid Id { get; set; }
    }
}
