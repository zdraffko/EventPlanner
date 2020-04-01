import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import EventsList from "./eventsList/EventsList";
import EventDetails from "../EventDetails";
import EventForm from "../EventForm";
import eventStore from "../../../stores/eventStore";

const EventsDashboard: React.FC = () => {
  const { selectedEvent, isInEditMode } = useContext(eventStore);

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventsList />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedEvent && !isInEditMode && <EventDetails />}
        {isInEditMode && (
          <EventForm key={(selectedEvent && selectedEvent.id) || 0} />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(EventsDashboard);
