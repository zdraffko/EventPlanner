using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions.HttpExceptions;
using Application.Common.Interfaces;
using Application.Common.Models.DTOs;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Users.Queries.LogIn
{
    public class LogInHandler : IRequestHandler<LogInQuery, UserDto>
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        private readonly IJwtGenerator _jwtGenerator;

        public LogInHandler(IUserService userService, IMapper mapper, IJwtGenerator jwtGenerator)
            => (_userService, _mapper, _jwtGenerator) = (userService, mapper, jwtGenerator);

        public async Task<UserDto> Handle(LogInQuery request, CancellationToken cancellationToken)
        {
            var user = await _userService.LogInAsync(request.Email, request.Password)
                ?? throw new UnauthorizedException("Invalid email or password.");

            var userDto = _mapper.Map<AppUser, UserDto>(user);
            userDto.Token = _jwtGenerator.Generate(user);

            return userDto;
        }

        //public LogInHandler(IUserService userService, IJwtGenerator jwtGenerator)
        //    => (_userService, _jwtGenerator) = (userService, jwtGenerator);

        //public async Task<UserDto> Handle(LogInQuery request, CancellationToken cancellationToken)
        //{
        //    var user = await _userService.LogInAsync(request.Email, request.Password)
        //               ?? throw new UnauthorizedException("Invalid email or password.");

        //    var userDto = new UserDto
        //    {
        //        Username = user.UserName,
        //        Token = _jwtGenerator.Generate(user)
        //    };

        //    return userDto;
        //}
    }
}
