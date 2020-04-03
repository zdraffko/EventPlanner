import React from "react";
import { Segment, Grid, Icon } from "semantic-ui-react";
import IEvent from "../../../models/eventModel";

interface IProps {
  event: IEvent;
}

const EventDetailsInfo: React.FC<IProps> = ({ event }) => (
  <Segment.Group>
    <Segment attached="top">
      <Grid>
        <Grid.Column width={1}>
          <Icon name="info" size="large" color="orange" />
        </Grid.Column>
        <Grid.Column width={15}>
          <p>{event.description}</p>
        </Grid.Column>
      </Grid>
    </Segment>
    <Segment attached>
      <Grid verticalAlign="middle">
        <Grid.Column width={1}>
          <Icon name="calendar" size="large" color="orange" />
        </Grid.Column>
        <Grid.Column width={15}>
          <span>{event.date}</span>
        </Grid.Column>
      </Grid>
    </Segment>
    <Segment attached>
      <Grid verticalAlign="middle">
        <Grid.Column width={1}>
          <Icon name="marker" size="large" color="orange" />
        </Grid.Column>
        <Grid.Column width={11}>
          <span>
            {event.venue}, {event.city}
          </span>
        </Grid.Column>
      </Grid>
    </Segment>
  </Segment.Group>
);

export default EventDetailsInfo;
