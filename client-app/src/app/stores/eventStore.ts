import { observable, action, computed, runInAction } from "mobx";
import { SyntheticEvent } from "react";
import agent from "../api/agent";
import IEvent, { IEventFormValues } from "../models/eventModel";
import { browserHistory } from "../..";
import * as NavConstants from "../constants/navigationalConstants";
import { RootStore } from "./rootStore";
import { IUser } from "../models/userModels";

class EventStore {
  private readonly RootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.RootStore = rootStore;
  }

  @observable
  events: Map<string, IEvent> = new Map();

  @observable
  selectedEvent: IEvent | undefined;

  @computed
  get eventsGroupedByDate() {
    const eventsByDate = Array.from(this.events.values()).sort(
      (eOne, eTwo) => Date.parse(eOne.date) - Date.parse(eTwo.date)
    );
    const groupedEvents = new Map<string, IEvent[]>();

    eventsByDate.forEach((event) => {
      const date = event.date.split("T")[0];
      const currentDateEvents = groupedEvents.get(date);

      if (currentDateEvents) {
        currentDateEvents.push(event);
        groupedEvents.set(date, currentDateEvents);
      } else {
        groupedEvents.set(date, [event]);
      }
    });

    return Array.from(groupedEvents);
  }

  @action
  loadAllEvents = async () => {
    this.RootStore.CommonStore.isGlobalLoading = true;
    const currentUser = this.RootStore.UserStore.user;

    try {
      const events = await agent.events.getAll();

      runInAction(() => {
        events.forEach((event) => {
          event.date = event.date.split(".")[0];

          this.setPropertiesForCurrentUser(event, currentUser!);

          this.events.set(event.id, event);
          this.RootStore.CommonStore.isGlobalLoading = false;
        });
      });
    } catch (error) {
      runInAction(() => {
        this.RootStore.CommonStore.isGlobalLoading = false;
      });
    }
  };

  @action
  loadEvent = async (id: string) => {
    this.RootStore.CommonStore.isGlobalLoading = true;
    const currentUser = this.RootStore.UserStore.user;

    let event = this.events.get(id);

    if (event) {
      this.selectedEvent = event;
      this.RootStore.CommonStore.isGlobalLoading = false;

      return event;
    } else {
      this.RootStore.CommonStore.isGlobalLoading = true;

      try {
        event = await agent.events.getEvent(id);

        event.date = event.date.split(".")[0];

        this.setPropertiesForCurrentUser(event, currentUser!);

        runInAction(() => {
          this.selectedEvent = event;
          this.events.set(event!.id, event!);
          this.RootStore.CommonStore.isGlobalLoading = false;
        });

        return event;
      } catch (error) {
        runInAction(() => {
          this.RootStore.CommonStore.isGlobalLoading = false;
        });
      }
    }
  };

  @action
  createEvent = async (formValues: IEventFormValues) => {
    this.RootStore.CommonStore.isElementLoading = true;

    try {
      formValues.id = await agent.events.create(formValues);

      const event = this.mapFormValuesToEvent(formValues);

      runInAction(() => {
        this.events.set(event.id, event);

        this.selectedEvent = event;
        this.RootStore.CommonStore.isElementLoading = false;
      });

      browserHistory.push(`${NavConstants.EVENTS}/${event.id}`);
    } catch (error) {
      runInAction(() => {
        this.RootStore.CommonStore.isElementLoading = false;
      });
    }
  };

  @action
  updateEvent = async (formValues: IEventFormValues) => {
    this.RootStore.CommonStore.isElementLoading = true;

    try {
      await agent.events.update(formValues);

      const event = this.mapFormValuesToEvent(formValues);

      runInAction(() => {
        this.events.set(event.id, event);

        this.selectedEvent = event;
        this.RootStore.CommonStore.isElementLoading = false;
      });

      browserHistory.push(`${NavConstants.EVENTS}/${event.id}`);
    } catch (error) {
      runInAction(() => {
        this.RootStore.CommonStore.isElementLoading = false;
      });
    }
  };

  @action
  deleteEvent = async (id: string, e: SyntheticEvent<HTMLButtonElement>) => {
    this.RootStore.CommonStore.elementLoadingTarget = e.currentTarget.name;
    this.RootStore.CommonStore.isElementLoading = true;

    try {
      await agent.events.delete(id);

      runInAction(() => {
        this.events.delete(id);

        this.RootStore.CommonStore.isElementLoading = false;
        this.RootStore.CommonStore.elementLoadingTarget = "";
      });
    } catch (error) {
      runInAction(() => {
        this.RootStore.CommonStore.isElementLoading = false;
        this.RootStore.CommonStore.elementLoadingTarget = "";
      });
    }
  };

  @action
  unselectEvent = () => (this.selectedEvent = undefined);

  mapFormValuesToEvent = (values: IEventFormValues): IEvent => ({
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

  setPropertiesForCurrentUser = (event: IEvent, user: IUser) => {
    event.isHost = event.attendees.some((attendee) => attendee.username === user.username && attendee.isHost);
    event.isAttending = event.attendees.some((attendee) => attendee.username === user.username);
  };
}

export default EventStore;
