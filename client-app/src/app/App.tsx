import React, { useEffect, useContext } from "react";
import { Route } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Container } from "semantic-ui-react";
import eventStore from "./stores/eventStore";
import NavBar from "./components/layout/NavBar";
import EventsDashboard from "./components/events/dashboard/EventsDashboard";
import LoaderComponent from "./components/layout/LoaderComponent";
import Home from "./components/layout/Home";
import EventForm from "./components/events/EventForm";

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
        <Route exact path="/" component={Home} />
        <Route path="/events" component={EventsDashboard} />
        <Route path="/createEvent" component={EventForm} />
      </Container>
    </>
  );
};

export default observer(App);
