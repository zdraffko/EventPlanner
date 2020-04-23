using System;
using System.Linq;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Identity.Policies.IsEventHost
{
    public class IsEventHostHandler : AuthorizationHandler<IsEventHostRequirement>
    {
        private readonly IEventPlannerDbContext _context;
        private readonly IUserService _userService;
        private readonly IHttpContextAccessor _httpAccessor;

        public IsEventHostHandler(
            IEventPlannerDbContext context,
            IUserService userService,
            IHttpContextAccessor httpAccessor)
            => (_context, _userService, _httpAccessor) = (context, userService, httpAccessor);

        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, IsEventHostRequirement requirement)
        {
            var eventId = _httpAccessor.HttpContext.Request.RouteValues["id"].ToString();

            if (eventId == null)
            {
                context.Fail();

                return;
            }

            var targetEvent = await _context.Events.FindAsync(Guid.Parse(eventId));
            var currentUser = await _userService.GetCurrentUserAsync();

            var eventHost = targetEvent.UserEvents.FirstOrDefault(userEvent => userEvent.IsHost)?.AppUser;

            if (eventHost?.UserName != currentUser.UserName)
            {
                context.Fail();

                return;
            }

            context.Succeed(requirement);
        }
    }
}
