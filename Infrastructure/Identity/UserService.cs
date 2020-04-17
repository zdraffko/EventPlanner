using System.Security.Claims;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Common.Models;
using Application.Users.Commands.Register;
using Infrastructure.Identity.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class UserService : IUserService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly JwtGenerator _jwtGenerator;
        private readonly IHttpContextAccessor _httpAccessor;

        public UserService(
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            JwtGenerator jwtGenerator,
            IHttpContextAccessor httpAccessor)
            => (_userManager, _signInManager, _jwtGenerator, _httpAccessor)
                = (userManager, signInManager, jwtGenerator, httpAccessor);

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
                    Token = _jwtGenerator.Generate(user)
                }
                : null;
        }

        public async Task<AppResult> RegisterAsync(RegisterCommand requestPayload)
        {
            if (await _userManager.FindByEmailAsync(requestPayload.Email) != null)
            {
                return AppResult.Failure("A user with the provided email already exists.");
            }

            if (await _userManager.FindByNameAsync(requestPayload.Email) != null)
            {
                return AppResult.Failure("A user with the provided username already exists.");
            }

            var user = new AppUser
            {
                UserName = requestPayload.Username,
                Email = requestPayload.Email
            };

            var result = await _userManager.CreateAsync(user, requestPayload.Password);

            return result.ToAppResult();
        }

        public async Task<UserDto> GetCurrentUserAsync()
        {
            var username = _httpAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);

            if (username == null)
            {
                return null;
            }

            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
            {
                return null;
            }

            return new UserDto
            {
                Username = user.UserName,
                Token = _jwtGenerator.Generate(user)
            };
        }
    }
}
