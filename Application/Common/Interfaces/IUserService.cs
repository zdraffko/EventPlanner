﻿using System.Threading.Tasks;
using Application.Users.Queries.LogIn;

namespace Application.Common.Interfaces
{
    public interface IUserService
    {
        Task<UserDto> LogInAsync(string email, string password);
    }
}
