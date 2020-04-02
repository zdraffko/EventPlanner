import React from "react";
import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import EventsList from "./eventsList/EventsList";

const EventsDashboard: React.FC = () => (
  <Grid>
    <Grid.Column width={10}>
      <EventsList />
    </Grid.Column>
  </Grid>
);

export default observer(EventsDashboard);
