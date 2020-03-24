using System;
using MediatR;

namespace Application.Events.Commands.UpdateEvent
{
    public class UpdateEventCommand : IRequest
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Category { get; set; }

        public DateTime? Date { get; set; }

        public string City { get; set; }

        public string Venue { get; set; }
    }
}
