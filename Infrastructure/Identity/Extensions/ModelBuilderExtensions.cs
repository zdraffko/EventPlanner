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
                        NormalizedUserName = "TESTUSER1",
                        Email = "testUser1@test.com",
                        NormalizedEmail = "TESTUSER1@TEST.COM",
                        PasswordHash = new PasswordHasher<AppUser>().HashPassword(null, "Pa$$w0rd1")
                    },
                    new AppUser
                    {
                        UserName = "testUser2",
                        NormalizedUserName = "TESTUSER2",
                        Email = "testUser2@test.com",
                        NormalizedEmail = "TESTUSER2@TEST.COM",
                        PasswordHash = new PasswordHasher<AppUser>().HashPassword(null, "Pa$$w0rd2")
                    });
        }
    }
}
