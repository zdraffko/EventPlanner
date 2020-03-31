import { observable, action } from "mobx";
import { createContext } from "react";
import agent from "../api/agent";
import IEvent from "../models/eventModel";

class EventStore {
  @observable
  events: IEvent[] = [];

  @observable
  isGlobalLoading = false;

  @action
  loadAllEvents = () => {
    this.isGlobalLoading = true;

    agent.events
      .getAll()
      .then(events => {
        events.forEach(event => {
          event.date = event.date.split(".")[0];
          this.events.push(event);
        });
      })
      .finally(() => (this.isGlobalLoading = false));
  };
}

export default createContext(new EventStore());
