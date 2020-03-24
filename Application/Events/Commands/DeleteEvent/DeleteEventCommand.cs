using System;
using MediatR;

namespace Application.Events.Commands.DeleteEvent
{
    public class DeleteEventCommand : IRequest
    {
        public Guid Id { get; set; }
    }
}
