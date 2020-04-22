using Domain.Entities;

namespace Application.Common.Interfaces
{
    public interface IJwtGenerator
    {
        string Generate(AppUser user);
    }
}
