using System;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class Event
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Category { get; set; }

        public DateTime Date { get; set; }

        public string City { get; set; }

        public string Venue { get; set; }

        public ICollection<UserEvent> UserEvents { get; set; }
    }
}
