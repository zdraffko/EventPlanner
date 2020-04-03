import React, { useContext, Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Item, Label } from "semantic-ui-react";
import eventStore from "../../../../stores/eventStore";
import EventItem from "./EventItem";

const EventList: React.FC = () => {
  const { eventsGroupedByDate } = useContext(eventStore);

  return (
    <>
      {eventsGroupedByDate.map(([date, events]) => (
        <Fragment key={date}>
          <Label size="large" color="orange">
            {date}
          </Label>
          <Item.Group divided>
            {events.map(event => (
              <EventItem key={event.id} event={event} />
            ))}
          </Item.Group>
        </Fragment>
      ))}
    </>
  );
};

export default observer(EventList);
