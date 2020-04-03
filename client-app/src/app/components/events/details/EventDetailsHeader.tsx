import React from "react";
import { Segment, Item, Header, Button, Image } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import IEvent from "../../../models/eventModel";

interface IProps {
  event: IEvent;
}

const eventImageTextStyles = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white"
};

const EventDetailsHeader: React.FC<IProps> = ({ event }) => (
  <Segment.Group>
    <Segment basic attached="top" style={{ padding: "0" }}>
      <Image
        src={`/assets/categoryImages/${event.category}.png`}
        fluid
        style={{
          filter: "brightness(30%)"
        }}
      />
      <Segment style={eventImageTextStyles} basic>
        <Item.Group>
          <Item>
            <Item.Content>
              <Header
                size="huge"
                content={event.title}
                style={{ color: "white" }}
              />
              <p>{event.date}</p>
              <p>
                Organized by <strong>User</strong>
              </p>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Segment>
    <Segment clearing attached="bottom">
      <Button color="teal">Join Event</Button>
      <Button>Cancel attendance</Button>
      <Button color="orange" floated="right">
        Manage Event
      </Button>
    </Segment>
  </Segment.Group>
);

export default observer(EventDetailsHeader);
