using System.Text;
using Application.Common.Interfaces;
using Domain.Entities;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure
{
    public static class ServiceRegistration
    {
        public static IServiceCollection RegisterInfrastructure(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IJwtGenerator, JwtGenerator>();

            services.AddDbContext<IdentityDbContext>(options
                => options.UseSqlServer(configuration.GetConnectionString("DevConnection")));

            services.AddDefaultIdentity<AppUser>()
                .AddEntityFrameworkStores<IdentityDbContext>()
                .AddSignInManager<SignInManager<AppUser>>();

            services.AddIdentityServer()
                .AddApiAuthorization<AppUser, IdentityDbContext>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JwtSecret"])),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    });

            return services;
        }
    }
}
