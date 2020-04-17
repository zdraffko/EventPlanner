import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import LoaderComponent from "../../layout/LoaderComponent";
import EventDetailsHeader from "./EventDetailsHeader";
import EventDetailsInfo from "./EventDetailsInfo";
import EventDetailsComments from "./EventDetailsComments";
import EventDetailsSidebar from "./EventDetailsSidebar";
import NotFound from "../../layout/errorPages/NotFound";
import { RootStoreContext } from "../../../stores/rootStore";

const EventDetails: React.FC = () => {
  const { EventStore, CommonStore } = useContext(RootStoreContext);

  const { selectedEvent, loadEvent } = EventStore;
  const { isGlobalLoading } = CommonStore;

  const { id } = useParams();

  useEffect(() => {
    loadEvent(id!);
  }, [id, loadEvent]);

  if (isGlobalLoading) {
    return <LoaderComponent content="Loading Event..." />;
  }

  if (!selectedEvent) {
    return <NotFound />;
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailsHeader event={selectedEvent} />
        <EventDetailsInfo event={selectedEvent} />
        <EventDetailsComments />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailsSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(EventDetails);
