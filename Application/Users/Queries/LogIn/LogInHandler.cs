using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions.HttpExceptions;
using Application.Common.Interfaces;
using Application.Common.Models;
using MediatR;

namespace Application.Users.Queries.LogIn
{
    public class LogInHandler : IRequestHandler<LogInQuery, UserDto>
    {
        private readonly IUserService _userService;

        public LogInHandler(IUserService userService) => _userService = userService;

        public async Task<UserDto> Handle(LogInQuery request, CancellationToken cancellationToken)
        {
            var user = await _userService.LogInAsync(request.Email, request.Password)
                ?? throw new UnauthorizedException("Invalid email or password.");

            return user;
        }
    }
}
