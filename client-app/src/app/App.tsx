import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Container } from "semantic-ui-react";
import eventStore from "./stores/eventStore";
import NavBar from "./components/layout/NavBar";
import EventsDashboard from "./components/events/dashboard/EventsDashboard";
import LoaderComponent from "./components/layout/LoaderComponent";

const App: React.FC = () => {
  const { loadAllEvents, isGlobalLoading } = useContext(eventStore);

  useEffect(() => {
    loadAllEvents();
  }, [loadAllEvents]);

  if (isGlobalLoading) return <LoaderComponent />;

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <EventsDashboard />
      </Container>
    </>
  );
};

export default observer(App);
