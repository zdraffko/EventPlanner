import React from "react";
import { Item, Segment } from "semantic-ui-react";
import IEvent from "../../../../models/eventModel";
import EventItem from "./EventItem";

interface IProps {
  events: IEvent[];
  handleEventSelect: (id: string) => void;
  handleDeleteEvent: (id: string) => void;
}

const EventList: React.FC<IProps> = ({
  events,
  handleEventSelect,
  handleDeleteEvent
}) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {events.map(event => (
          <EventItem
            key={event.id}
            event={event}
            handleEventSelect={handleEventSelect}
            handleDeleteEvent={handleDeleteEvent}
          />
        ))}
      </Item.Group>
    </Segment>
  );
};

export default EventList;
