using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Identity.Extensions
{
    public static class ModelBuilderExtensions
    {
        public static void SeedUsers(this ModelBuilder builder)
        {
            builder.Entity<AppUser>()
                .HasData(
                    new AppUser
                    {
                        UserName = "testUser1",
                        Email = "testUser1@test.com",
                        PasswordHash = new PasswordHasher<AppUser>().HashPassword(null, "Pa$$w0rd1")
                    },
                    new AppUser
                    {
                        UserName = "testUser2",
                        Email = "testUser2@test.com",
                        PasswordHash = new PasswordHasher<AppUser>().HashPassword(null, "Pa$$w0rd2")
                    });
        }
    }
}
