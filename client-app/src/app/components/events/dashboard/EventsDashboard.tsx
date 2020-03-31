import React, { SyntheticEvent, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import IEvent from "../../../models/eventModel";
import EventsList from "./eventsList/EventsList";
import EventDetails from "../EventDetails";
import EventForm from "../EventForm";
import eventStore from "../../../stores/eventStore";

interface IProps {
  handleEventUnselect: () => void;
  handleIsInEditMode: (isInEditMode: boolean) => void;
  handleCreateEvent: (event: IEvent) => void;
  handleEditEvent: (event: IEvent) => void;
  handleDeleteEvent: (id: string, e: SyntheticEvent<HTMLButtonElement>) => void;
  isElementLoading: boolean;
  elementLoadingTarget: string;
}

const EventsDashboard: React.FC<IProps> = ({
  handleEventUnselect,
  handleIsInEditMode,
  handleCreateEvent,
  handleEditEvent,
  handleDeleteEvent,
  isElementLoading,
  elementLoadingTarget
}) => {
  const { selectedEvent, isInEditMode } = useContext(eventStore);

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventsList
          handleDeleteEvent={handleDeleteEvent}
          isElementLoading={isElementLoading}
          elementLoadingTarget={elementLoadingTarget}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedEvent && (
          <EventDetails
            selectedEvent={selectedEvent}
            handleEventUnselect={handleEventUnselect}
            handleIsInEditMode={handleIsInEditMode}
          />
        )}
        {isInEditMode && (
          <EventForm
            key={(selectedEvent && selectedEvent.id) || 0}
            selectedEvent={selectedEvent!}
            handleIsInEditMode={handleIsInEditMode}
            handleCreateEvent={handleCreateEvent}
            handleEditEvent={handleEditEvent}
            isElementLoading={isElementLoading}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(EventsDashboard);
