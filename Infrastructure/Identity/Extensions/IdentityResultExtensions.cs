using System.Linq;
using Application.Common.Models;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity.Extensions
{
    public static class IdentityResultExtensions
    {
        public static AppResult ToAppResult(this IdentityResult result)
            => result.Succeeded
                ? AppResult.Success()
                : AppResult.Failure(result.Errors.ToArray()[0].Description);
    }
}
