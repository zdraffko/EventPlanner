﻿using System.Threading.Tasks;
using Application.Common.Models.DTOs;
using Application.Users.Commands.Register;
using Application.Users.Queries.GetCurrentUser;
using Application.Users.Queries.LogIn;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController : ApiController
    {
        [AllowAnonymous]
        [HttpPost(nameof(LogIn))]
        public async Task<ActionResult<UserDto>> LogIn(LogInQuery query)
        {
            var user = await Mediator.Send(query);

            return Ok(user);
        }

        [AllowAnonymous]
        [HttpPost(nameof(Register))]
        public async Task<ActionResult> Register(RegisterCommand command)
        {
            await Mediator.Send(command);

            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await Mediator.Send(new GetCurrentUserQuery());

            return Ok(user);
        }
    }
}
