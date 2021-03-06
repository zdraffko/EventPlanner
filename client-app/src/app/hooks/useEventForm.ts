import { useCallback, useContext } from "react";
import * as YupValidator from "yup";
import IEvent, { IEventFormValues } from "../models/eventModel";
import { RootStoreContext } from "../stores/rootStore";

const useEventForm = () => {
  const { createEvent, updateEvent } = useContext(RootStoreContext).EventStore;

  class FormValues implements IEventFormValues {
    constructor(values?: IEvent) {
      Object.assign(this, values);
    }

    id = "";
    title = "";
    description = "";
    category = "";
    date = "";
    city = "";
    venue = "";
  }

  const validationSchema = YupValidator.object({
    title: YupValidator.string().required("Title is required.").max(100, "The title must not exceed 100 characters."),

    description: YupValidator.string()
      .required("Description is required.")
      .max(1000, "The description must not exceed 1000 characters."),

    category: YupValidator.string().required("Category is required."),

    date: YupValidator.date().required("Date is required."),

    city: YupValidator.string().required("City is required.").max(100, "The city name must not exceed 100 characters."),

    venue: YupValidator.string()
      .required("Venue is required.")
      .max(100, "The venue name must not exceed 100 characters."),
  });

  const handleFormSubmit = useCallback(
    (event: IEventFormValues) => {
      if (event.id) {
        updateEvent(event);
      } else {
        createEvent(event);
      }
    },
    [createEvent, updateEvent]
  );

  return { FormValues, validationSchema, handleFormSubmit };
};

export default useEventForm;
