using IdentityServer4.EntityFramework.Options;
using Infrastructure.Identity.Extensions;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Infrastructure.Identity
{
    public class IdentityDbContext : ApiAuthorizationDbContext<AppUser>
    {
        public IdentityDbContext(
            DbContextOptions<IdentityDbContext> options,
            IOptions<OperationalStoreOptions> operationalStoreOptions)
            : base(options, operationalStoreOptions) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.SeedUsers();
        }
    }
}
