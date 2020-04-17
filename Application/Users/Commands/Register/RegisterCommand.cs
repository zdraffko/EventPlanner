using MediatR;

namespace Application.Users.Commands.Register
{
    public class RegisterCommand : IRequest
    {
        public string Username { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }
    }
}
