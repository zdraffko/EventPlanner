import IEvent, { IEventFormValues, IAttendee } from "../models/eventModel";
import { IUser } from "../models/userModels";

export const mapFormValuesToEvent = (values: IEventFormValues): IEvent => ({
  id: values.id,
  title: values.title,
  description: values.description,
  category: values.category,
  date: values.date,
  city: values.city,
  venue: values.venue,
  attendees: [],
  isHost: false,
  isAttending: false,
});

export const setPropertiesForCurrentUser = (event: IEvent, user: IUser) => {
  event.isHost = event.attendees.some((attendee) => attendee.username === user.username && attendee.isHost);
  event.isAttending = event.attendees.some((attendee) => attendee.username === user.username);
};

export const createAttendee = (user: IUser): IAttendee => ({
  username: user.username,
  isHost: false,
});

export const createHost = (user: IUser): IAttendee => ({
  username: user.username,
  isHost: true,
});
