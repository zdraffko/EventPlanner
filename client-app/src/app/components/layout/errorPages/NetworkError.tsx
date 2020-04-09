import React from "react";
import { Segment, Header, Icon } from "semantic-ui-react";

const NetworkError = () => (
  <Segment placeholder>
    <Header icon>
      <Icon name="wifi" />A network error has occurred.
    </Header>
  </Segment>
);

export default NetworkError;
