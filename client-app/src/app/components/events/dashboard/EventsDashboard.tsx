import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import EventsList from "./eventsList/EventsList";
import LoaderComponent from "../../layout/LoaderComponent";
import { RootStoreContext } from "../../../stores/rootStore";

const EventsDashboard: React.FC = () => {
  const { EventStore, CommonStore } = useContext(RootStoreContext);

  const { loadAllEvents } = EventStore;
  const { isGlobalLoading } = CommonStore;

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
