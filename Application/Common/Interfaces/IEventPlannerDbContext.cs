using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Common.Interfaces
{
    public interface IEventPlannerDbContext
    {
        DbSet<Event> Events { get; set; }
    }
}
