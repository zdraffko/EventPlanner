using System.Reflection;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Application
{
    public static class ServiceRegistration
    {
        public static IServiceCollection RegisterApplication(this IServiceCollection services)
        {
            services.AddMediatR(Assembly.GetExecutingAssembly());

            return services;
        }
    }
}
