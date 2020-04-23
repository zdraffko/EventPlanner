import React from "react";
import { Link } from "react-router-dom";
import { Item, Button, Segment, Icon, Label } from "semantic-ui-react";
import * as NavConstants from "../../../../constants/navigationalConstants";
import IEvent from "../../../../models/eventModel";
import { observer } from "mobx-react-lite";
import AttendeesList from "./AttendeesList";

interface IProps {
  event: IEvent;
}

const EventItem: React.FC<IProps> = ({ event }) => (
  <Segment.Group>
    <Segment>
      <Item.Group>
        <Item>
          <Item.Image size="tiny" circular src="/assets/user.png" />
          <Item.Content>
            <Item.Header>{event.title}</Item.Header>
            <Item.Description>
              Hosted by {event.attendees.find((attendee) => attendee.isHost)?.username}
            </Item.Description>
            {event.isHost && (
              <Item.Description>
                <Label basic color="green">
                  You are hosting this event
                </Label>
              </Item.Description>
            )}
            {event.isAttending && !event.isHost && (
              <Item.Description>
                <Label basic color="orange">
                  You are attending this event
                </Label>
              </Item.Description>
            )}
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
    <Segment>
      <Icon name="clock" /> {event.date}
      <Icon name="marker" /> {event.venue}, {event.city}
    </Segment>
    <Segment secondary>
      {event.attendees.length > 0 ? (
        <AttendeesList attendees={event.attendees} />
      ) : (
        <h4>Be the first one to attend this event!</h4>
      )}
    </Segment>
    <Segment clearing>
      <span>{event.description}</span>
      <Button as={Link} to={`${NavConstants.EVENTS}/${event.id}`} floated="right" content="View" color="orange" />
    </Segment>
  </Segment.Group>
);

export default observer(EventItem);
