import React, { Fragment } from "react";
import { Segment, List, Item, Label, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

const EventDetailsSidebar = () => (
  <Fragment>
    <Segment
      textAlign="center"
      style={{ border: "none" }}
      attached="top"
      secondary
      inverted
      color="black"
    >
      2 People Going
    </Segment>
    <Segment attached>
      <List relaxed divided>
        <Item style={{ position: "relative" }}>
          <Label style={{ position: "absolute" }} color="orange" ribbon="right">
            Organizer
          </Label>
          <Image size="tiny" src={"/assets/user.png"} />
          <Item.Content verticalAlign="middle">
            <Item.Header as="h3">
              <Link to={`#`}>User1</Link>
            </Item.Header>
            <Item.Extra style={{ color: "orange" }}>Following</Item.Extra>
          </Item.Content>
        </Item>

        <Item style={{ position: "relative" }}>
          <Image size="tiny" src={"/assets/user.png"} />
          <Item.Content verticalAlign="middle">
            <Item.Header as="h3">
              <Link to={`#`}>User2</Link>
            </Item.Header>
          </Item.Content>
        </Item>
      </List>
    </Segment>
  </Fragment>
);

export default EventDetailsSidebar;
