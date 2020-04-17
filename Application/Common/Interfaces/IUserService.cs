using System.Threading.Tasks;
using Application.Common.Models;
using Application.Users.Commands.Register;

namespace Application.Common.Interfaces
{
    public interface IUserService
    {
        Task<UserDto> LogInAsync(string email, string password);

        Task<AppResult> RegisterAsync(RegisterCommand requestPayload);

        Task<UserDto> GetCurrentUserAsync();
    }
}
