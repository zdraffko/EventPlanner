import React, { useContext } from "react";
import { Item, Button, Label } from "semantic-ui-react";
import IEvent from "../../../../models/eventModel";
import { observer } from "mobx-react-lite";
import eventStore from "../../../../stores/eventStore";

interface IProps {
  event: IEvent;
}

const EventItem: React.FC<IProps> = ({ event }) => {
  const {
    selectEvent,
    isElementLoading,
    deleteEvent,
    elementLoadingTarget
  } = useContext(eventStore);

  return (
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
            onClick={() => selectEvent(event.id)}
            floated="right"
            content="View"
            color="orange"
          />
          <Button
            name={event.id}
            loading={isElementLoading && elementLoadingTarget === event.id}
            onClick={e => deleteEvent(event.id, e)}
            floated="right"
            content="Delete"
            color="red"
          />
          <Label basic content={event.category} />
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default observer(EventItem);
