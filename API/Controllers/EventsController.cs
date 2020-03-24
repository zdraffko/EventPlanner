using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Events.Commands.CreateEvent;
using Application.Events.Queries.GetAllEventsList;
using Application.Events.Queries.GetEvent;
using Domain.Entities;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class EventsController : ApiController
    {
        [HttpGet]
        public async Task<ActionResult<IList<Event>>> GetAllEvents()
        {
            var events = await Mediator.Send(new GetAllEventsListQuery());

            return Ok(events);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Event>> GetEvent(Guid id)
        {
            var targetEvent = await Mediator.Send(new GetEventQuery { Id = id });

            return Ok(targetEvent);
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> CreateEvent(CreateEventCommand command)
        {
            var eventId = await Mediator.Send(command);

            return Created(new Uri($"{Request.GetEncodedUrl()}{eventId}"), eventId);
        }
    }
}
