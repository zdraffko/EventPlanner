using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions.HttpExceptions;
using Application.Common.Interfaces;
using MediatR;

namespace Application.Users.Commands.Register
{
    public class RegisterHandler : IRequestHandler<RegisterCommand>
    {
        private readonly IUserService _userService;

        public RegisterHandler(IUserService userService) => _userService = userService;

        public async Task<Unit> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            var result = await _userService.RegisterAsync(request);

            return result.Succeeded
                ? Unit.Value
                : throw new BadRequestException(result.Error);
        }
    }
}
