using Application.Common.Interfaces;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Persistence.Extensions;

namespace Persistence
{
    public class EventPlannerDbContext : DbContext, IEventPlannerDbContext
    {
        public EventPlannerDbContext(DbContextOptions<EventPlannerDbContext> options) : base(options) { }

        public DbSet<Event> Events { get; set; }

        public DbSet<UserEvent> UserEvents { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(GetType().Assembly);
            modelBuilder.SeedData();
        }
    }
}
