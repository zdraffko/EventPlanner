import React from "react";
import { Menu, Button, Container } from "semantic-ui-react";

const NavBar: React.FC = () => (
  <Menu inverted fixed="top">
    <Container>
      <Menu.Item header>
        <img
          src="/assets/logo.png"
          alt="logo"
          style={{ marginRight: "15px" }}
        />
        Event Planner
      </Menu.Item>
      <Menu.Item name="Events" />
      <Menu.Item>
        <Button color="orange" content="Create Event" />
      </Menu.Item>
    </Container>
  </Menu>
);

export default NavBar;
