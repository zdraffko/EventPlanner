using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Events.Queries.GetAllEventsList;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class EventsController : ApiController
    {
        [HttpGet]
        public async Task<ActionResult<IList<Event>>> GetAllEvents()
        {
            var events = await Mediator.Send(new GetAllEventsListQuery());

            return base.Ok(events);
        }
    }
}
