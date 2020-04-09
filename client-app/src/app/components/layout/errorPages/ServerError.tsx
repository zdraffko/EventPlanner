import React from "react";
import { Segment, Header, Icon, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ServerError = () => (
  <Segment placeholder>
    <Header icon>
      <Icon name="server" />
      500 - A server error has occurred. We will fix it as soon as possible.
    </Header>
    <Segment.Inline>
      <Button as={Link} to="/events" color="orange">
        Return to the Events page
      </Button>
    </Segment.Inline>
  </Segment>
);

export default ServerError;
