import React, { useState, useEffect } from "react";
import axios from "axios";
import { List } from "semantic-ui-react";
import IEvent from "./models/eventModel";
import { EVENTS_BASE_URL } from "./constants/apiConstants";

const App: React.FC = () => {
  const [events, setEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    axios
      .get<IEvent[]>(EVENTS_BASE_URL)
      .then(response => setEvents(response.data));
  }, []);

  return (
    <List>
      {events.map(event => (
        <List.Item key={event.id}>{event.title}</List.Item>
      ))}
    </List>
  );
};

export default App;
