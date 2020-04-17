using Application.Common.Models;
using MediatR;

namespace Application.Users.Queries.GetCurrentUser
{
    public class GetCurrentUserQuery : IRequest<UserDto> { }
}
