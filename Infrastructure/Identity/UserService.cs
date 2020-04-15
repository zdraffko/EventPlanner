using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Users.Queries.LogIn;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class UserService : IUserService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;

        public UserService(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
            => (_userManager, _signInManager) = (userManager, signInManager);

        public async Task<UserDto> LogInAsync(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
            {
                return null;
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, password, false);

            return result.Succeeded
                ? new UserDto
                {
                    Username = user.UserName,
                    Token = ""
                }
                : null;
        }
    }
}
