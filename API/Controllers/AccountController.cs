using System.Threading.Tasks;
using Application.Users.Queries.LogIn;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController : ApiController
    {
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> LogIn(LogInQuery query)
        {
            var user = await Mediator.Send(query);

            return Ok(user);
        }
    }
}
