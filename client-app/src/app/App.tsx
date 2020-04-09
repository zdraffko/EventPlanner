import React from "react";
import { Route, useLocation, Switch } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Container } from "semantic-ui-react";
import * as NavConstants from "./constants/navigationalConstants";
import NavBar from "./components/layout/NavBar";
import EventsDashboard from "./components/events/dashboard/EventsDashboard";
import Home from "./components/layout/Home";
import EventForm from "./components/events/EventForm";
import EventDetails from "./components/events/details/EventDetails";
import NotFound from "./components/layout/errorPages/NotFound";
import ServerError from "./components/layout/errorPages/ServerError";
import NetworkError from "./components/layout/errorPages/NetworkError";

const App: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <Route exact path={NavConstants.HOME} component={Home} />
      <Route
        path="/(.+)"
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route
                  exact
                  path={NavConstants.EVENTS}
                  component={EventsDashboard}
                />
                <Route
                  path={NavConstants.EVENT_DETAILS}
                  component={EventDetails}
                />
                <Route
                  key={location.key!}
                  path={[NavConstants.CREATE_EVENT, NavConstants.UPDATE_EVENT]}
                  component={EventForm}
                />
                <Route
                  exact
                  path={NavConstants.SERVER_ERROR}
                  component={ServerError}
                />
                <Route
                  exact
                  path={NavConstants.NETWORK_ERROR}
                  component={NetworkError}
                />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
};

export default observer(App);
