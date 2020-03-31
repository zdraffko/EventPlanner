import React, { SyntheticEvent } from "react";
import { observer } from "mobx-react-lite";
import { Item, Segment } from "semantic-ui-react";
import IEvent from "../../../../models/eventModel";
import EventItem from "./EventItem";

interface IProps {
  events: IEvent[];
  handleEventSelect: (id: string) => void;
  handleDeleteEvent: (id: string, e: SyntheticEvent<HTMLButtonElement>) => void;
  isElementLoading: boolean;
  elementLoadingTarget: string;
}

const EventList: React.FC<IProps> = ({
  events,
  handleEventSelect,
  handleDeleteEvent,
  isElementLoading,
  elementLoadingTarget
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
            isElementLoading={isElementLoading}
            elementLoadingTarget={elementLoadingTarget}
          />
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(EventList);
