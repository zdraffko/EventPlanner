import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import IEvent from "./models/eventModel";
import { EVENTS_BASE_URL } from "./constants/apiConstants";
import NavBar from "./components/NavBar";
import EventsDashboard from "./components/events/dashboard/EventsDashboard";

const App: React.FC = () => {
  const [events, setEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    axios
      .get<IEvent[]>(EVENTS_BASE_URL)
      .then(response => setEvents(response.data));
  }, []);

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <EventsDashboard events={events} />
      </Container>
    </>
  );
};

export default App;
