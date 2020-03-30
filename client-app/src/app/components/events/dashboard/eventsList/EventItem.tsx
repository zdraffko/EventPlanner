import React, { SyntheticEvent } from "react";
import { Item, Button, Label } from "semantic-ui-react";
import IEvent from "../../../../models/eventModel";

interface IProps {
  event: IEvent;
  handleEventSelect: (id: string) => void;
  handleDeleteEvent: (id: string, e: SyntheticEvent<HTMLButtonElement>) => void;
  isElementLoading: boolean;
  elementLoadingTarget: string;
}

const EventItem: React.FC<IProps> = ({
  event,
  handleEventSelect,
  handleDeleteEvent,
  isElementLoading,
  elementLoadingTarget
}) => (
  <Item>
    <Item.Content>
      <Item.Header>{event.title}</Item.Header>
      <Item.Meta>{event.date}</Item.Meta>
      <Item.Description>
        <div>{event.description}</div>
        <div>
          {event.city}, {event.venue}
        </div>
      </Item.Description>
      <Item.Extra>
        <Button
          onClick={() => handleEventSelect(event.id)}
          floated="right"
          content="View"
          color="orange"
        />
        <Button
          name={event.id}
          loading={isElementLoading && elementLoadingTarget === event.id}
          onClick={e => handleDeleteEvent(event.id, e)}
          floated="right"
          content="Delete"
          color="red"
        />
        <Label basic content={event.category} />
      </Item.Extra>
    </Item.Content>
  </Item>
);

export default EventItem;
