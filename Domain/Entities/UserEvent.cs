using System;

namespace Domain.Entities
{
    public class UserEvent
    {
        public string AppUserId { get; set; }

        public virtual AppUser AppUser { get; set; }

        public Guid EventId { get; set; }

        public virtual Event Event { get; set; }

        public DateTime DateJoined { get; set; }

        public bool IsHost { get; set; }
    }
}
