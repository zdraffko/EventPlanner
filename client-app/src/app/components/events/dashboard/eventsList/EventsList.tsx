import React, { SyntheticEvent, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Item, Segment } from "semantic-ui-react";
import eventStore from "../../../../stores/eventStore";
import EventItem from "./EventItem";

interface IProps {
  handleDeleteEvent: (id: string, e: SyntheticEvent<HTMLButtonElement>) => void;
  isElementLoading: boolean;
  elementLoadingTarget: string;
}

const EventList: React.FC<IProps> = ({
  handleDeleteEvent,
  isElementLoading,
  elementLoadingTarget
}) => {
  const { events, selectEvent } = useContext(eventStore);

  return (
    <Segment clearing>
      <Item.Group divided>
        {events.map(event => (
          <EventItem
            key={event.id}
            event={event}
            selectEvent={selectEvent}
            handleDeleteEvent={handleDeleteEvent}
            isElementLoading={isElementLoading}
            elementLoadingTarget={elementLoadingTarget}
          />
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(EventList);
