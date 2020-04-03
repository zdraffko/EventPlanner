import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import eventStore from "../../../stores/eventStore";
import LoaderComponent from "../../layout/LoaderComponent";
import EventDetailsHeader from "./EventDetailsHeader";
import EventDetailsInfo from "./EventDetailsInfo";
import EventDetailsComments from "./EventDetailsComments";
import EventDetailsSidebar from "./EventDetailsSidebar";

const EventDetails: React.FC = () => {
  const { selectedEvent, loadEvent, isGlobalLoading } = useContext(eventStore);

  const { id } = useParams();

  useEffect(() => {
    loadEvent(id!);
  }, [id, loadEvent]);

  if (isGlobalLoading || !selectedEvent)
    return <LoaderComponent content="Loading Event..." />;

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
