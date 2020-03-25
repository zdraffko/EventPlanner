import React from "react";
import { Grid } from "semantic-ui-react";
import IEvent from "../../../models/eventModel";
import EventList from "./EventList";

interface IProps {
  events: IEvent[];
}

const EventsDashboard: React.FC<IProps> = ({ events }) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} />
        {/* <List>
          {events.map(event => (
            <List.Item key={event.id}>{event.title}</List.Item>
          ))}
        </List> */}
      </Grid.Column>
    </Grid>
  );
};

export default EventsDashboard;
