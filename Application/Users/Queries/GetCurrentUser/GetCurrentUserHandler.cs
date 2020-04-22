using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions.HttpExceptions;
using Application.Common.Interfaces;
using Application.Common.Models.DTOs;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Users.Queries.GetCurrentUser
{
    public class GetCurrentUserHandler : IRequestHandler<GetCurrentUserQuery, UserDto>
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        private readonly IJwtGenerator _jwtGenerator;

        public GetCurrentUserHandler(IUserService userService, IMapper mapper, IJwtGenerator jwtGenerator)
            => (_userService, _mapper, _jwtGenerator) = (userService, mapper, jwtGenerator);

        public async Task<UserDto> Handle(GetCurrentUserQuery request, CancellationToken cancellationToken)
        {
            var user = await _userService.GetCurrentUserAsync()
                ?? throw new NotFoundException();

            var userDto = _mapper.Map<AppUser, UserDto>(user);
            userDto.Token = _jwtGenerator.Generate(user);

            return userDto;
        }
    }
}
