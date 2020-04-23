import React, { useContext } from "react";
import { Segment, Item, Header, Button, Image } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import IEvent from "../../../models/eventModel";
import { Link } from "react-router-dom";
import { RootStoreContext } from "../../../stores/rootStore";

interface IProps {
  event: IEvent;
}

const eventImageTextStyles = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

const EventDetailsHeader: React.FC<IProps> = ({ event }) => {
  const { EventStore, CommonStore } = useContext(RootStoreContext);
  const { attendEvent, unAttendEvent, deleteEvent } = EventStore;
  const { isElementLoading } = CommonStore;

  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={`/assets/categoryImages/${event.category}.png`}
          fluid
          style={{
            filter: "brightness(30%)",
          }}
        />
        <Segment style={eventImageTextStyles} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header size="huge" content={event.title} style={{ color: "white" }} />
                <p>{event.date}</p>
                <p>
                  Hosted by <strong>{event.attendees.find((attendee) => attendee.isHost)?.username}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        {event.isHost ? (
          <>
            <Button as={Link} to={`/update/${event.id}`} color="orange" floated="right">
              Manage Event
            </Button>
            <Button onClick={() => deleteEvent(event.id)} loading={isElementLoading} color="red" floated="right">
              Delete Event
            </Button>
          </>
        ) : event.isAttending ? (
          <Button onClick={() => unAttendEvent(event.id)} loading={isElementLoading}>
            Cancel attendance
          </Button>
        ) : (
          <Button onClick={() => attendEvent(event.id)} loading={isElementLoading} color="teal">
            Join Event
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default observer(EventDetailsHeader);
