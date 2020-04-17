using System.Threading.Tasks;
using Application.Common.Models;
using Application.Users.Commands.Register;
using Application.Users.Queries.LogIn;

namespace Application.Common.Interfaces
{
    public interface IUserService
    {
        Task<UserDto> LogInAsync(string email, string password);

        Task<AppResult> RegisterAsync(RegisterCommand requestPayload);
    }
}
