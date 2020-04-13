import React, { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
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
  const { FormValues, validationSchema, handleFormSubmit } = useEventForm();

  const { isElementLoading, loadEvent } = useContext(eventStore);

  const { id } = useParams();
  const browserHistory = useHistory();

  const [event, setEvent] = useState(new FormValues());

  useEffect(() => {
    if (id) {
      loadEvent(id).then((e) => setEvent(new FormValues(e)));
    }
  }, [FormValues, id, loadEvent]);

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <Formik
            initialValues={event}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
            enableReinitialize
          >
            {({ handleSubmit, handleChange, isValid, dirty }) => (
              <Form onSubmit={handleSubmit}>
                <TextInput
                  name="title"
                  type="text"
                  placeholder="Title"
                  value={event.title}
                  onChange={handleChange}
                />
                <TextArea
                  name="description"
                  type="text"
                  placeholder="Description"
                  rows={3}
                  value={event.description}
                  onChange={handleChange}
                />
                <SelectInput
                  name="category"
                  placeholder="Category"
                  value={event.category}
                  options={categoryOptions}
                  onChange={handleChange}
                />
                <TextInput
                  name="date"
                  type="datetime-local"
                  placeholder="Date"
                  value={event.date}
                  onChange={handleChange}
                />
                <TextInput
                  name="city"
                  type="text"
                  placeholder="City"
                  value={event.city}
                  onChange={handleChange}
                />
                <TextInput
                  name="venue"
                  type="text"
                  placeholder="Venue"
                  value={event.venue}
                  onChange={handleChange}
                />
                <Button
                  floated="right"
                  color="orange"
                  type="submit"
                  content="Submit"
                  loading={isElementLoading}
                  disabled={!isValid || !dirty}
                />
                <Button
                  onClick={() =>
                    id
                      ? browserHistory.push(
                          `${NavConstants.EVENTS}/${event.id}`
                        )
                      : browserHistory.push(NavConstants.EVENTS)
                  }
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
