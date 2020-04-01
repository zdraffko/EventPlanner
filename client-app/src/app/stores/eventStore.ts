import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import agent from "../api/agent";
import IEvent from "../models/eventModel";

configure({ enforceActions: "always" });
class EventStore {
  @observable
  events: Map<string, IEvent> = new Map();

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

  @computed
  get eventsByDateArray() {
    return Array.from(this.events.values()).sort(
      (eOne, eTwo) => Date.parse(eOne.date) - Date.parse(eTwo.date)
    );
  }

  @action
  loadAllEvents = async () => {
    this.isGlobalLoading = true;

    const events = await agent.events.getAll();

    runInAction(() => {
      events.forEach(event => {
        event.date = event.date.split(".")[0];
        this.events.set(event.id, event);
      });

      this.isGlobalLoading = false;
    });
  };

  @action
  createEvent = async (event: IEvent) => {
    this.isElementLoading = true;

    event.id = await agent.events.create(event);

    runInAction(() => {
      this.events.set(event.id, event);

      this.selectedEvent = event;
      this.isInEditMode = false;
      this.isElementLoading = false;
    });
  };

  @action
  updateEvent = async (event: IEvent) => {
    this.isElementLoading = true;

    await agent.events.update(event);

    runInAction(() => {
      this.events.set(event.id, event);

      this.selectedEvent = event;
      this.isInEditMode = false;
      this.isElementLoading = false;
    });
  };

  @action
  deleteEvent = async (id: string, e: SyntheticEvent<HTMLButtonElement>) => {
    this.elementLoadingTarget = e.currentTarget.name;
    this.isElementLoading = true;

    await agent.events.delete(id);

    runInAction(() => {
      this.events.delete(id);

      this.isElementLoading = false;
      this.elementLoadingTarget = "";
    });
  };

  @action
  selectEvent = (id: string) => {
    this.selectedEvent = this.events.get(id);
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
    this.selectedEvent = this.events.get(id);
    this.isInEditMode = true;
  };

  @action
  closeEventForm = () => (this.isInEditMode = false);
}

export default createContext(new EventStore());
