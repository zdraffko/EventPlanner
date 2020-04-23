import React from "react";
import { IAttendee } from "../../../../models/eventModel";
import { List, Image, Popup } from "semantic-ui-react";

interface IProps {
  attendees: IAttendee[];
}

const AttendeesList: React.FC<IProps> = ({ attendees }) => (
  <List horizontal>
    {attendees.map((attendee) => (
      <List.Item key={attendee.username}>
        <Popup header={attendee.username} trigger={<Image size="mini" circular src="/assets/user.png" />} />
      </List.Item>
    ))}
  </List>
);

export default AttendeesList;
