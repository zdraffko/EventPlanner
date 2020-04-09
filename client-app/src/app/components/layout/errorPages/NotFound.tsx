import React from "react";
import { Segment, Header, Icon, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <Segment placeholder>
    <Header icon>
      <Icon name="search" />
      404 - we've searched everywhere but couldn't find the page you are looking
      for.
    </Header>
    <Segment.Inline>
      <Button as={Link} to="/events" color="orange">
        Return to the Events page
      </Button>
    </Segment.Inline>
  </Segment>
);

export default NotFound;
