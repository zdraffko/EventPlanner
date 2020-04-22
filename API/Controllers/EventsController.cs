using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Common.Models.DTOs;
using Application.Events.Commands.AttendEvent;
using Application.Events.Commands.CreateEvent;
using Application.Events.Commands.DeleteEvent;
using Application.Events.Commands.UnAttendEvent;
using Application.Events.Commands.UpdateEvent;
using Application.Events.Queries.GetAllEventsList;
using Application.Events.Queries.GetEvent;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class EventsController : ApiController
    {
        [HttpGet]
        public async Task<ActionResult<IList<EventDto>>> GetAllEvents()
        {
            var events = await Mediator.Send(new GetAllEventsListQuery());

            return Ok(events);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EventDto>> GetEvent(Guid id)
        {
            var targetEvent = await Mediator.Send(new GetEventQuery { Id = id });

            return Ok(targetEvent);
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> CreateEvent(CreateEventCommand command)
        {
            var eventId = await Mediator.Send(command);

            return Created(new Uri($"{Request.GetEncodedUrl()}/{eventId}"), eventId);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateEvent(Guid id, UpdateEventCommand command)
        {
            command.Id = id;

            await Mediator.Send(command);

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEvent(Guid id)
        {
            await Mediator.Send(new DeleteEventCommand { Id = id });

            return Ok();
        }

        [HttpPost("{id}/attendance")]
        public async Task<ActionResult> AttendEvent(Guid id)
        {
            await Mediator.Send(new AttendEventCommand { Id = id });

            return Ok();
        }

        [HttpDelete("{id}/attendance")]
        public async Task<ActionResult> UnAttendEvent(Guid id)
        {
            await Mediator.Send(new UnAttendEventCommand { Id = id });

            return Ok();
        }
    }
}
