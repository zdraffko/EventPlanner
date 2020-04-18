import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, Button, Container, Dropdown, Image } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import * as NavConstants from "../../constants/navigationalConstants";
import { RootStoreContext } from "../../stores/rootStore";

const NavBar: React.FC = () => {
  const { UserStore } = useContext(RootStoreContext);

  const { user, logOut } = UserStore;

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header as={NavLink} exact to={NavConstants.HOME}>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: "15px" }} />
          Event Planner
        </Menu.Item>
        <Menu.Item name="Events" as={NavLink} to={NavConstants.EVENTS} />
        <Menu.Item>
          <Button as={NavLink} to={NavConstants.CREATE_EVENT} color="orange" content="Create Event" />
        </Menu.Item>
        {user && (
          <Menu.Item position="right">
            <Image avatar spaced="right" src="/assets/user.png" />
            <Dropdown pointing="top left" text={user.username}>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to={`${NavConstants.ACCOUNT}`} text="My profile" icon="user" />
                <Dropdown.Item onClick={logOut} text="Log out" icon="power" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
