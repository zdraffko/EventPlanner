using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain.Entities
{
    public class AppUser : IdentityUser
    {
        public ICollection<UserEvent> UserEvents { get; set; }
    }
}
