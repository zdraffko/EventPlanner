import React, { Fragment } from "react";
import { Segment, List, Item, Label, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IAttendee } from "../../../models/eventModel";

interface IProps {
  attendees: IAttendee[];
}

const EventDetailsSidebar: React.FC<IProps> = ({ attendees }) => (
  <Fragment>
    <Segment textAlign="center" style={{ border: "none" }} attached="top" secondary inverted color="black">
      {attendees.length} {attendees.length === 1 ? "Person is going" : "People are going"}
    </Segment>
    {attendees.length > 0 && (
      <Segment attached>
        <List relaxed divided>
          {attendees.map((attendee) => (
            <Item style={{ position: "relative" }} key={attendee.username}>
              {attendee.isHost && (
                <Label style={{ position: "absolute" }} color="orange" ribbon="right">
                  Host
                </Label>
              )}
              <Image size="tiny" src={"/assets/user.png"} />
              <Item.Content verticalAlign="middle">
                <Item.Header as="h3">
                  <Link to={`#`}>{attendee.username}</Link>
                </Item.Header>
              </Item.Content>
            </Item>
          ))}
        </List>
      </Segment>
    )}
  </Fragment>
);

export default EventDetailsSidebar;
