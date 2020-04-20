import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Container, Segment, Header, Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import * as NavConstants from "../../constants/navigationalConstants";
import { RootStoreContext } from "../../stores/rootStore";
import LogInForm from "../users/LogInForm";
import RegisterForm from "../users/RegisterForm";

const Home = () => {
  const { UserStore, CommonStore } = useContext(RootStoreContext);

  const { user, isLoggedIn } = UserStore;
  const { openModal } = CommonStore;

  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image size="massive" src="/assets/logo.png" alt="logo" style={{ marginBottom: 12 }} />
          Event Planner
        </Header>
        {isLoggedIn ? (
          <>
            <Header as="h2" inverted content={`Welcome back ${user?.username}`} />
            <Button as={Link} to={NavConstants.EVENTS} size="huge" inverted>
              Take me to the events
            </Button>
          </>
        ) : (
          <>
            <Header as="h2" inverted content="Welcome" />
            <div style={{ marginBottom: "20px" }}>Please log in or register to access the events</div>
            <Button onClick={() => openModal(<LogInForm />)} size="huge" inverted>
              Log In
            </Button>
            <Button onClick={() => openModal(<RegisterForm />)} size="huge" inverted>
              Register
            </Button>
          </>
        )}
      </Container>
    </Segment>
  );
};

export default observer(Home);
