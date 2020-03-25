import React from "react";
import { Item, Segment } from "semantic-ui-react";
import IEvent from "../../../models/eventModel";
import EventItem from "./EventItem";

interface IProps {
  events: IEvent[];
}

const EventList: React.FC<IProps> = ({ events }) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {events.map(event => (
          <EventItem
            title={event.title}
            description={event.description}
            category={event.category}
            date={event.date}
            city={event.city}
            venue={event.venue}
          />
        ))}
      </Item.Group>
    </Segment>
  );
};

export default EventList;
