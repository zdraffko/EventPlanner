import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Button, Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import * as NavConstants from "../../constants/navigationalConstants";

const NavBar: React.FC = () => {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header as={NavLink} exact to={NavConstants.HOME}>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "15px" }}
          />
          Event Planner
        </Menu.Item>
        <Menu.Item name="Events" as={NavLink} to={NavConstants.EVENTS} />
        <Menu.Item>
          <Button
            as={NavLink}
            to={NavConstants.CREATE_EVENT}
            color="orange"
            content="Create Event"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
