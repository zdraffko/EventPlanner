using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Identity.Configurations
{
    public class UserEventConfiguration : IEntityTypeConfiguration<UserEvent>
    {
        public void Configure(EntityTypeBuilder<UserEvent> builder)
        {
            builder.HasKey(userEvent => new { userEvent.AppUserId, userEvent.EventId });

            builder
                .HasOne(userEvent => userEvent.AppUser)
                .WithMany(appUser => appUser.UserEvents)
                .HasForeignKey(userEvent => userEvent.AppUserId);

            builder
                .HasOne(userEvent => userEvent.Event)
                .WithMany(e => e.UserEvents)
                .HasForeignKey(userEvent => userEvent.EventId);
        }
    }
}
