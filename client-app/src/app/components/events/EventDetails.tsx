import React from "react";
import { Card, Image, Button } from "semantic-ui-react";
import IEvent from "../../models/eventModel";
import { observer } from "mobx-react-lite";

interface IProps {
  selectedEvent: IEvent;
  handleEventUnselect: () => void;
  handleIsInEditMode: (isInEditMode: boolean) => void;
}

const EventDetails: React.FC<IProps> = ({
  selectedEvent,
  handleEventUnselect,
  handleIsInEditMode
}) => (
  <Card fluid>
    <Image
      src={`/assets/categoryImages/${selectedEvent.category}.png`}
      wrapped
      ui={false}
    />
    <Card.Content>
      <Card.Header>{selectedEvent.title}</Card.Header>
      <Card.Meta>
        <span>{selectedEvent.date}</span>
      </Card.Meta>
      <Card.Description>{selectedEvent.description}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button.Group widths={2}>
        <Button
          onClick={handleEventUnselect}
          content="Cancel"
          basic
          color="grey"
        />
        <Button
          onClick={() => handleIsInEditMode(true)}
          content="Edit"
          basic
          color="orange"
        />
      </Button.Group>
    </Card.Content>
  </Card>
);

export default observer(EventDetails);
