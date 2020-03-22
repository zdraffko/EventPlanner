using Application.Common.Interfaces;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class EventPlannerDbContext : DbContext, IEventPlannerDbContext
    {
        public EventPlannerDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Event> Events { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(GetType().Assembly);
        }
    }
}
