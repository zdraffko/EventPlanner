import React, { useState, FormEvent, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import IEvent from "../../models/eventModel";
import * as NavConstants from "../../constants/navigationalConstants";
import { observer } from "mobx-react-lite";
import eventStore from "../../stores/eventStore";
import { Formik } from "formik";
import TextInput from "../form/TextInput";
import useEventForm from "../../hooks/useEventForm";
import TextArea from "../form/TextArea";
import SelectInput from "../form/SelectInput";
import { categoryOptions } from "../../util/categoryOptions";

const EventForm: React.FC = () => {
  const { initialFormValues, handleFormSubmit } = useEventForm();

  const {
    createEvent,
    selectedEvent,
    isElementLoading,
    updateEvent,
    loadEvent,
    unselectEvent,
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
    venue: "",
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

  // const handleFormSubmit = () => {
  //   if (event.id.length === 0) {
  //     createEvent(event).then(redirectToEventDetails);
  //   } else {
  //     updateEvent(event).then(redirectToEventDetails);
  //   }
  // };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit}>
            {({ handleSubmit, handleChange, values }) => (
              <Form onSubmit={handleSubmit}>
                <TextInput
                  name="title"
                  type="text"
                  placeholder="Title"
                  value={values.title}
                  onChange={handleChange}
                />
                <TextArea
                  name="description"
                  type="text"
                  placeholder="Description"
                  rows={3}
                  value={values.description}
                  onChange={handleChange}
                />
                <SelectInput
                  name="category"
                  placeholder="Category"
                  value={values.category}
                  options={categoryOptions}
                  onChange={handleChange}
                />
                <TextInput
                  name="date"
                  type="datetime-local"
                  placeholder="Date"
                  value={values.date}
                  onChange={handleChange}
                />
                <TextInput
                  name="city"
                  type="text"
                  placeholder="City"
                  value={values.city}
                  onChange={handleChange}
                />
                <TextInput
                  name="venue"
                  type="text"
                  placeholder="Venue"
                  value={values.venue}
                  onChange={handleChange}
                />
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
            )}
          </Formik>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(EventForm);
