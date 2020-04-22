using Application.Common.Models.DTOs;
using MediatR;

namespace Application.Users.Queries.LogIn
{
    public class LogInQuery : IRequest<UserDto>
    {
        public string Email { get; set; }

        public string Password { get; set; }
    }
}
