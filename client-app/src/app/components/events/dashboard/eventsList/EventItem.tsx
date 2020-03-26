import React from "react";
import { Item, Button, Label } from "semantic-ui-react";
import IEvent from "../../../../models/eventModel";

interface IProps {
  event: IEvent;
  handleEventSelect: (id: string) => void;
  handleDeleteEvent: (id: string) => void;
}

const EventItem: React.FC<IProps> = ({
  event,
  handleEventSelect,
  handleDeleteEvent
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
          onClick={() => handleDeleteEvent(event.id)}
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
