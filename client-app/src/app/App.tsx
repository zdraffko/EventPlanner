import React from "react";
import { Route, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Container } from "semantic-ui-react";
import * as NavConstants from "./constants/navigationalConstants";
import NavBar from "./components/layout/NavBar";
import EventsDashboard from "./components/events/dashboard/EventsDashboard";
import Home from "./components/layout/Home";
import EventForm from "./components/events/EventForm";
import EventDetails from "./components/events/EventDetails";

const App: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Route exact path={NavConstants.HOME} component={Home} />
        <Route exact path={NavConstants.EVENTS} component={EventsDashboard} />
        <Route path={NavConstants.EVENT_DETAILS} component={EventDetails} />
        <Route
          key={location.key!}
          path={[NavConstants.CREATE_EVENT, NavConstants.UPDATE_EVENT]}
          component={EventForm}
        />
      </Container>
    </>
  );
};

export default observer(App);
