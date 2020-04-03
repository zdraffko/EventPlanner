import React, { useContext, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Card, Image, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import eventStore from "../../stores/eventStore";
import * as NavConstants from "../../constants/navigationalConstants";
import LoaderComponent from "../layout/LoaderComponent";

const EventDetails: React.FC = () => {
  const { selectedEvent, loadEvent, isGlobalLoading } = useContext(eventStore);

  const { id } = useParams();
  const browserHistory = useHistory();

  useEffect(() => {
    loadEvent(id!);
  }, [id, loadEvent]);

  if (isGlobalLoading || !selectedEvent)
    return <LoaderComponent content="Loading Event..." />;

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
          <Button
            onClick={() => browserHistory.push(NavConstants.EVENTS)}
            content="Cancel"
            basic
            color="grey"
          />
          <Button
            as={Link}
            to={`/update/${selectedEvent.id}`}
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
