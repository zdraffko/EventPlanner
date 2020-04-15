using Application.Common.Interfaces;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure
{
    public static class ServiceRegistration
    {
        public static IServiceCollection RegisterInfrastructure(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddScoped<IUserService, UserService>();

            services.AddDbContext<IdentityDbContext>(options
                => options.UseSqlServer(configuration.GetConnectionString("DevConnection")));

            services.AddDefaultIdentity<AppUser>()
                .AddEntityFrameworkStores<IdentityDbContext>()
                .AddSignInManager<SignInManager<AppUser>>();

            services.AddIdentityServer()
                .AddApiAuthorization<AppUser, IdentityDbContext>();

            services.AddAuthentication()
                .AddIdentityServerJwt();

            return services;
        }
    }
}
