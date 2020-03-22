using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class EventConfiguration : IEntityTypeConfiguration<Event>
    {
        public void Configure(EntityTypeBuilder<Event> eventBuilder)
        {
            eventBuilder.HasKey(e => e.Id);

            eventBuilder
                .Property(e => e.Title)
                .IsRequired();

            eventBuilder
                .Property(e => e.Description)
                .IsRequired();

            eventBuilder
                .Property(e => e.Category)
                .IsRequired();

            eventBuilder
                .Property(e => e.Date)
                .IsRequired();

            eventBuilder
                .Property(e => e.City)
                .IsRequired();

            eventBuilder
                .Property(e => e.Venue)
                .IsRequired();
        }
    }
}
