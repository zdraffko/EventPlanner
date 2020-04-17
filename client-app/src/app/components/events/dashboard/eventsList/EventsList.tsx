import React, { useContext, Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Item, Label } from "semantic-ui-react";
import EventItem from "./EventItem";
import { RootStoreContext } from "../../../../stores/rootStore";

const EventList: React.FC = () => {
  const { eventsGroupedByDate } = useContext(RootStoreContext).EventStore;

  return (
    <>
      {eventsGroupedByDate.map(([date, events]) => (
        <Fragment key={date}>
          <Label size="large" color="orange">
            {date}
          </Label>
          <Item.Group divided>
            {events.map((event) => (
              <EventItem key={event.id} event={event} />
            ))}
          </Item.Group>
        </Fragment>
      ))}
    </>
  );
};

export default observer(EventList);
