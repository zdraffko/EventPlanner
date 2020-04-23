export default interface IEvent {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  city: string;
  venue: string;
  attendees: IAttendee[];
  isHost: boolean;
  isAttending: boolean;
}

export interface IEventFormValues {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  city: string;
  venue: string;
}

export interface IAttendee {
  username: string;
  isHost: boolean;
}
