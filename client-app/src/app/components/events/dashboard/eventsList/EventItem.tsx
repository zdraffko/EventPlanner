import React from "react";
import { Link } from "react-router-dom";
import { Item, Button, Segment, Icon } from "semantic-ui-react";
import * as NavConstants from "../../../../constants/navigationalConstants";
import IEvent from "../../../../models/eventModel";
import { observer } from "mobx-react-lite";

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
            <Item.Description>Organized by User</Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
    <Segment>
      <Icon name="clock" /> {event.date}
      <Icon name="marker" /> {event.venue}, {event.city}
    </Segment>
    <Segment secondary>Who is going</Segment>
    <Segment clearing>
      <span>{event.description}</span>
      <Button
        as={Link}
        to={`${NavConstants.EVENTS}/${event.id}`}
        floated="right"
        content="View"
        color="orange"
      />
    </Segment>
  </Segment.Group>
);

export default observer(EventItem);
