import { observable, action } from "mobx";
import { createContext } from "react";
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
  selectEvent = (id: string) => {
    this.selectedEvent = this.events.find(event => event.id === id);
    this.isInEditMode = true;
  };

  @action
  openCreateEventForm = () => {
    this.selectedEvent = undefined;
    this.isInEditMode = true;
  };
}

export default createContext(new EventStore());
