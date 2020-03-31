import React, { useContext } from "react";
import { Menu, Button, Container } from "semantic-ui-react";
import eventStore from "../../stores/eventStore";

const NavBar: React.FC = () => {
  const { openCreateEventForm } = useContext(eventStore);

  return (
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
          <Button
            onClick={openCreateEventForm}
            color="orange"
            content="Create Event"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
