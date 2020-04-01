import { observable, action } from "mobx";
import { createContext, SyntheticEvent } from "react";
import agent from "../api/agent";
import IEvent from "../models/eventModel";

class EventStore {
  @observable
  events: IEvent[] = [];

  @observable
  selectedEvent: IEvent | undefined;

  @observable
  isInEditMode = false;

  @observable
  isGlobalLoading = false;

  @observable
  isElementLoading = false;

  @observable
  elementLoadingTarget = "";

  @action
  loadAllEvents = async () => {
    this.isGlobalLoading = true;

    const events = await agent.events.getAll();

    events.forEach(event => {
      event.date = event.date.split(".")[0];
      this.events.push(event);
    });

    this.isGlobalLoading = false;
  };

  @action
  createEvent = async (event: IEvent) => {
    this.isElementLoading = true;

    event.id = await agent.events.create(event);

    this.events.push(event);
    this.selectedEvent = event;
    this.isInEditMode = false;
    this.isElementLoading = false;
  };

  @action
  updateEvent = async (event: IEvent) => {
    this.isElementLoading = true;

    await agent.events.update(event);

    this.events = [...this.events.filter(e => e.id !== event.id), event];

    this.selectedEvent = event;
    this.isInEditMode = false;
    this.isElementLoading = false;
  };

  @action
  deleteEvent = async (id: string, e: SyntheticEvent<HTMLButtonElement>) => {
    this.elementLoadingTarget = e.currentTarget.name;
    this.isElementLoading = true;

    await agent.events.delete(id);

    this.events = this.events.filter(event => event.id !== id);

    this.isElementLoading = false;
    this.elementLoadingTarget = "";
  };

  @action
  selectEvent = (id: string) => {
    this.selectedEvent = this.events.find(event => event.id === id);
    this.isInEditMode = false;
  };

  @action
  unselectEvent = () => (this.selectedEvent = undefined);

  @action
  openCreateEventForm = () => {
    this.selectedEvent = undefined;
    this.isInEditMode = true;
  };

  @action
  openUpdateEventForm = (id: string) => {
    this.selectedEvent = this.events.find(event => event.id === id);
    this.isInEditMode = true;
  };

  @action
  closeEventForm = () => (this.isInEditMode = false);
}

export default createContext(new EventStore());
