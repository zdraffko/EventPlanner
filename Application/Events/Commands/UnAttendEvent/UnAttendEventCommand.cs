using System;
using MediatR;

namespace Application.Events.Commands.UnAttendEvent
{
    public class UnAttendEventCommand : IRequest
    {
        public Guid Id { get; set; }
    }
}
