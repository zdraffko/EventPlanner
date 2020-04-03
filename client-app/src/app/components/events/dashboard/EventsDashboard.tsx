import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import eventStore from "../../../stores/eventStore";
import EventsList from "./eventsList/EventsList";
import LoaderComponent from "../../layout/LoaderComponent";

const EventsDashboard: React.FC = () => {
  const { loadAllEvents, isGlobalLoading } = useContext(eventStore);

  useEffect(() => {
    loadAllEvents();
  }, [loadAllEvents]);

  if (isGlobalLoading) return <LoaderComponent />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventsList />
      </Grid.Column>
    </Grid>
  );
};

export default observer(EventsDashboard);
