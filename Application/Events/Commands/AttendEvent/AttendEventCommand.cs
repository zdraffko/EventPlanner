using System;
using MediatR;

namespace Application.Events.Commands.AttendEvent
{
    public class AttendEventCommand : IRequest
    {
        public Guid Id { get; set; }
    }
}
