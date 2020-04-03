import React, { useState, FormEvent, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import IEvent from "../../models/eventModel";
import * as NavConstants from "../../constants/navigationalConstants";
import { observer } from "mobx-react-lite";
import eventStore from "../../stores/eventStore";

const EventForm: React.FC = () => {
  const {
    createEvent,
    selectedEvent,
    isElementLoading,
    updateEvent,
    loadEvent,
    unselectEvent
  } = useContext(eventStore);

  const { id } = useParams();
  const browserHistory = useHistory();

  const [event, setEvent] = useState<IEvent>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: ""
  });

  useEffect(() => {
    if (id && event.id.length === 0) {
      loadEvent(id).then(() => selectedEvent && setEvent(selectedEvent));
    }
    return unselectEvent;
  }, [event.id.length, id, loadEvent, selectedEvent, unselectEvent]);

  const handleInputChange = (
    htmlEvent: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = htmlEvent.currentTarget;
    setEvent({ ...event, [name]: value });
  };

  const redirectToEventDetails = () =>
    browserHistory.push(`${NavConstants.EVENTS}/${event.id}`);

  const handleFormSubmit = () => {
    if (event.id.length === 0) {
      createEvent(event).then(redirectToEventDetails);
    } else {
      updateEvent(event).then(redirectToEventDetails);
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
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
            <Button
              floated="right"
              color="orange"
              type="submit"
              content="Submit"
              loading={isElementLoading}
            />
            <Button
              onClick={() => browserHistory.push(NavConstants.EVENTS)}
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(EventForm);
