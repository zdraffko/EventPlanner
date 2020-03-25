import React from "react";
import { Item, Button, Label } from "semantic-ui-react";

interface IProps {
  title: string;
  description: string;
  category: string;
  date: Date;
  city: string;
  venue: string;
}

const EventItem: React.FC<IProps> = ({
  title,
  description,
  category,
  date,
  city,
  venue
}) => (
  <Item>
    <Item.Content>
      <Item.Header as="a">{title}</Item.Header>
      <Item.Meta>{date}</Item.Meta>
      <Item.Description>
        <div>{description}</div>
        <div>
          {city}, {venue}
        </div>
      </Item.Description>
      <Item.Extra>
        <Button floated="right" content="View" color="orange" />
        <Label basic content={category} />
      </Item.Extra>
    </Item.Content>
  </Item>
);

export default EventItem;
