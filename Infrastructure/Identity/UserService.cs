﻿using System.Security.Claims;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Common.Models;
using Application.Users.Commands.Register;
using Domain.Entities;
using Infrastructure.Identity.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class UserService : IUserService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IHttpContextAccessor _httpAccessor;

        public UserService(
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            IHttpContextAccessor httpAccessor)
            => (_userManager, _signInManager, _httpAccessor)
                = (userManager, signInManager, httpAccessor);

        public async Task<AppUser> LogInAsync(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
            {
                return null;
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, password, false);

            return result.Succeeded ? user : null;
        }

        public async Task<AppResult> RegisterAsync(RegisterCommand requestPayload)
        {
            if (await _userManager.FindByEmailAsync(requestPayload.Email) != null)
            {
                return AppResult.Failure("A user with the provided email already exists.");
            }

            if (await _userManager.FindByNameAsync(requestPayload.Email) != null)
            {
                return AppResult.Failure("A user with the provided username already exists.");
            }

            var user = new AppUser
            {
                UserName = requestPayload.Username,
                Email = requestPayload.Email
            };

            var result = await _userManager.CreateAsync(user, requestPayload.Password);

            return result.ToAppResult();
        }

        public async Task<AppUser> GetCurrentUserAsync()
        {
            var username = _httpAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);

            if (username == null)
            {
                return null;
            }

            var user = await _userManager.FindByNameAsync(username);

            return user;
        }
    }
}
