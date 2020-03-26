import React, { useState, FormEvent } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import IEvent from "../../models/eventModel";

interface IProps {
  selectedEvent: IEvent;
  handleIsInEditMode: (isInEditMode: boolean) => void;
  handleCreateEvent: (event: IEvent) => void;
  handleEditEvent: (event: IEvent) => void;
}

const EventForm: React.FC<IProps> = ({
  selectedEvent,
  handleIsInEditMode,
  handleCreateEvent,
  handleEditEvent
}) => {
  const initializeEvent = () => {
    if (selectedEvent) {
      return selectedEvent;
    } else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: ""
      };
    }
  };

  const [event, setEvent] = useState<IEvent>(initializeEvent);

  const handleInputChange = (
    htmlEvent: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = htmlEvent.currentTarget;
    setEvent({ ...event, [name]: value });
  };

  const handleFormSubmit = () => {
    if (event.id.length === 0) {
      handleCreateEvent(event);
    } else {
      handleEditEvent(event);
    }
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleFormSubmit}>
        <Form.Input
          onChange={handleInputChange}
          placeholder="Title"
          name="title"
          value={event.title}
        ></Form.Input>
        <Form.TextArea
          onChange={handleInputChange}
          rows={2}
          placeholder="Description"
          name="description"
          value={event.description}
        ></Form.TextArea>
        <Form.Input
          onChange={handleInputChange}
          placeholder="Category"
          name="category"
          value={event.category}
        ></Form.Input>
        <Form.Input
          onChange={handleInputChange}
          placeholder="Date"
          name="date"
          type="datetime-local"
          value={event.date}
        ></Form.Input>
        <Form.Input
          onChange={handleInputChange}
          placeholder="City"
          name="city"
          value={event.city}
        ></Form.Input>
        <Form.Input
          onChange={handleInputChange}
          placeholder="Venue"
          name="venue"
          value={event.venue}
        ></Form.Input>
        <Button floated="right" color="orange" type="submit" content="Submit" />
        <Button
          onClick={() => handleIsInEditMode(false)}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default EventForm;
