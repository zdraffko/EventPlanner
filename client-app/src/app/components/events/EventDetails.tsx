import React, { useContext } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import eventStore from "../../stores/eventStore";

const EventDetails: React.FC = () => {
  const { selectedEvent, unselectEvent, openUpdateEventForm } = useContext(
    eventStore
  );

  if (selectedEvent === undefined) return <h1>Event not found</h1>;

  return (
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
          <Button onClick={unselectEvent} content="Cancel" basic color="grey" />
          <Button
            onClick={() => openUpdateEventForm(selectedEvent.id)}
            content="Edit"
            basic
            color="orange"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(EventDetails);
