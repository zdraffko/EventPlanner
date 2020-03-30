import React, { useState, useEffect, SyntheticEvent } from "react";
import agent from "./api/agent";
import { Container } from "semantic-ui-react";
import IEvent from "./models/eventModel";
import NavBar from "./components/layout/NavBar";
import EventsDashboard from "./components/events/dashboard/EventsDashboard";
import LoaderComponent from "./components/layout/LoaderComponent";

const App: React.FC = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [isGlobalLoading, setIsGlobalLoading] = useState(true);
  const [isElementLoading, setIsElementLoading] = useState(false);
  const [elementLoadingTarget, setElementLoadingTarget] = useState("");

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
    agent.events
      .getAll()
      .then(response => {
        const events = response;

        events.forEach(event => {
          event.date = event.date.split(".")[0];
        });

        setEvents(events);
      })
      .then(() => setIsGlobalLoading(false));
  }, []);

  if (isGlobalLoading) return <LoaderComponent />;

  return (
    <>
      <NavBar handleOpenCreateEventForm={handleOpenCreateEventForm} />
      <Container style={{ marginTop: "7em" }}>
        <EventsDashboard
          events={events}
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

export default App;
