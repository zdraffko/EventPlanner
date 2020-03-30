import React, { SyntheticEvent } from "react";
import { Grid } from "semantic-ui-react";
import IEvent from "../../../models/eventModel";
import EventsList from "./eventsList/EventsList";
import EventDetails from "../EventDetails";
import EventForm from "../EventForm";

interface IProps {
  events: IEvent[];
  selectedEvent: IEvent | null;
  handleEventSelect: (id: string) => void;
  handleEventUnselect: () => void;
  isInEditMode: boolean;
  handleIsInEditMode: (isInEditMode: boolean) => void;
  handleCreateEvent: (event: IEvent) => void;
  handleEditEvent: (event: IEvent) => void;
  handleDeleteEvent: (id: string, e: SyntheticEvent<HTMLButtonElement>) => void;
  isElementLoading: boolean;
  elementLoadingTarget: string;
}

const EventsDashboard: React.FC<IProps> = ({
  events,
  selectedEvent,
  handleEventSelect,
  handleEventUnselect,
  isInEditMode,
  handleIsInEditMode,
  handleCreateEvent,
  handleEditEvent,
  handleDeleteEvent,
  isElementLoading,
  elementLoadingTarget
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventsList
          events={events}
          handleEventSelect={handleEventSelect}
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

export default EventsDashboard;
