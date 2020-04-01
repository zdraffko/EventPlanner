import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Item, Segment } from "semantic-ui-react";
import eventStore from "../../../../stores/eventStore";
import EventItem from "./EventItem";

const EventList: React.FC = () => {
  const { events } = useContext(eventStore);

  return (
    <Segment clearing>
      <Item.Group divided>
        {events.map(event => (
          <EventItem key={event.id} event={event} />
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(EventList);
