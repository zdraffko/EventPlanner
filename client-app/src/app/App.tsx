import React, { useState, useEffect } from "react";
import agent from "./api/agent";
import { Container } from "semantic-ui-react";
import IEvent from "./models/eventModel";
import NavBar from "./components/NavBar";
import EventsDashboard from "./components/events/dashboard/EventsDashboard";

const App: React.FC = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const [isInEditMode, setIsInEditMode] = useState(false);

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
    agent.events.create(event).then(() => {
      setSelectedEvent(event);
      setEvents([...events, event]);
      setIsInEditMode(false);
    });
  };

  const handleEditEvent = (event: IEvent) => {
    agent.events.update(event).then(() => {
      setSelectedEvent(event);
      setEvents([...events.filter(e => e.id !== event.id), event]);
      setIsInEditMode(false);
    });
  };

  const handleDeleteEvent = (id: string) => {
    agent.events
      .delete(id)
      .then(() => setEvents(events.filter(event => event.id !== id)));
  };

  useEffect(() => {
    agent.events.getAll().then(response => {
      const events = response;

      events.forEach(event => {
        event.date = event.date.split(".")[0];
      });

      setEvents(events);
    });
  }, []);

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
        />
      </Container>
    </>
  );
};

export default App;
