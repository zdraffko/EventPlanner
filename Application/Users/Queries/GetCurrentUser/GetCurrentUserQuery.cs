using Application.Common.Models.DTOs;
using MediatR;

namespace Application.Users.Queries.GetCurrentUser
{
    public class GetCurrentUserQuery : IRequest<UserDto> { }
}
