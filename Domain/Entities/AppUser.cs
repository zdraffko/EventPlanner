using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Domain.Entities
{
    [Table("AspNetUsers")]
    public class AppUser : IdentityUser
    {
        public virtual ICollection<UserEvent> UserEvents { get; set; }
    }
}
