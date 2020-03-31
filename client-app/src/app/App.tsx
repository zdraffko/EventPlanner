import React, { useState, useEffect, SyntheticEvent, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Container } from "semantic-ui-react";
import agent from "./api/agent";
import IEvent from "./models/eventModel";
import EventStore from "./stores/eventStore";
import NavBar from "./components/layout/NavBar";
import EventsDashboard from "./components/events/dashboard/EventsDashboard";
import LoaderComponent from "./components/layout/LoaderComponent";

const App: React.FC = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [isElementLoading, setIsElementLoading] = useState(false);
  const [elementLoadingTarget, setElementLoadingTarget] = useState("");

  const eventStore = useContext(EventStore);

  const handleEventSelect = (id: string) => {
    setSelectedEvent(events.filter(event => event.id === id)[0]);
    setIsInEditMode(false);
  };

  const handleEventUnselect = () => {
    setSelectedEvent(null);
    setIsInEditMode(false);
  };

  const handleOpenCreateEventForm = () => {
    setSelectedEvent(null);
    setIsInEditMode(true);
  };

  const handleCreateEvent = (event: IEvent) => {
    setIsElementLoading(true);

    agent.events
      .create(event)
      .then(() => {
        setSelectedEvent(event);
        setEvents([...events, event]);
        setIsInEditMode(false);
      })
      .then(() => setIsElementLoading(false));
  };

  const handleEditEvent = (event: IEvent) => {
    setIsElementLoading(true);

    agent.events
      .update(event)
      .then(() => {
        setSelectedEvent(event);
        setEvents([...events.filter(e => e.id !== event.id), event]);
        setIsInEditMode(false);
      })
      .then(() => setIsElementLoading(false));
  };

  const handleDeleteEvent = (
    id: string,
    e: SyntheticEvent<HTMLButtonElement>
  ) => {
    setElementLoadingTarget(e.currentTarget.name);
    setIsElementLoading(true);

    agent.events
      .delete(id)
      .then(() => setEvents(events.filter(event => event.id !== id)))
      .then(() => setIsElementLoading(false));
  };

  useEffect(() => {
    eventStore.loadAllEvents();
  }, [eventStore]);

  if (eventStore.isGlobalLoading) return <LoaderComponent />;

  return (
    <>
      <NavBar handleOpenCreateEventForm={handleOpenCreateEventForm} />
      <Container style={{ marginTop: "7em" }}>
        <EventsDashboard
          events={eventStore.events}
          selectedEvent={selectedEvent}
          handleEventSelect={handleEventSelect}
          handleEventUnselect={handleEventUnselect}
          isInEditMode={isInEditMode}
          handleIsInEditMode={setIsInEditMode}
          handleCreateEvent={handleCreateEvent}
          handleEditEvent={handleEditEvent}
          handleDeleteEvent={handleDeleteEvent}
          isElementLoading={isElementLoading}
          elementLoadingTarget={elementLoadingTarget}
        />
      </Container>
    </>
  );
};

export default observer(App);
