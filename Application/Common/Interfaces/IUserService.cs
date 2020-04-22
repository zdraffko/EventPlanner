using System.Threading.Tasks;
using Application.Common.Models;
using Application.Users.Commands.Register;
using Domain.Entities;

namespace Application.Common.Interfaces
{
    public interface IUserService
    {
        Task<AppUser> LogInAsync(string email, string password);

        Task<AppResult> RegisterAsync(RegisterCommand requestPayload);

        Task<AppUser> GetCurrentUserAsync();
    }
}
