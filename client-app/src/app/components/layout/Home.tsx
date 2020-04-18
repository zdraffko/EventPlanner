import React from "react";
import { Container, Segment, Header, Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import * as NavConstants from "../../constants/navigationalConstants";

const Home = () => (
  <Segment inverted textAlign="center" vertical className="masthead">
    <Container text>
      <Header as="h1" inverted>
        <Image size="massive" src="/assets/logo.png" alt="logo" style={{ marginBottom: 12 }} />
        Event Planner
      </Header>
      <Header as="h2" inverted content="Welcome" />
      <Button as={Link} to={NavConstants.LOGIN} size="huge" inverted>
        Log In
      </Button>
    </Container>
  </Segment>
);

export default Home;
