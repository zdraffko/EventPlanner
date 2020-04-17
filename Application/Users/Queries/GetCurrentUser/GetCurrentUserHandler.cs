using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions.HttpExceptions;
using Application.Common.Interfaces;
using Application.Common.Models;
using MediatR;

namespace Application.Users.Queries.GetCurrentUser
{
    public class GetCurrentUserHandler : IRequestHandler<GetCurrentUserQuery, UserDto>
    {
        private readonly IUserService _userService;

        public GetCurrentUserHandler(IUserService userService) => _userService = userService;

        public async Task<UserDto> Handle(GetCurrentUserQuery request, CancellationToken cancellationToken)
        {
            var user = await _userService.GetCurrentUserAsync()
                ?? throw new NotFoundException();

            return user;
        }
    }
}
