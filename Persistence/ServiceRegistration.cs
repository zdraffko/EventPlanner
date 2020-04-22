using Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Persistence
{
    public static class ServiceRegistration
    {
        public static IServiceCollection RegisterPersistence(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddDbContextPool<EventPlannerDbContext>(options =>
            {
                options.UseLazyLoadingProxies();
                options.UseSqlServer(configuration.GetConnectionString("DevConnection"));
            });

            services.AddScoped<IEventPlannerDbContext>(provider
                => provider.GetService<EventPlannerDbContext>());

            return services;
        }
    }
}
