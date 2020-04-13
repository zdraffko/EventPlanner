import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import agent from "../api/agent";
import IEvent from "../models/eventModel";
import { browserHistory } from "../..";
import * as NavConstants from "../constants/navigationalConstants";

configure({ enforceActions: "always" });

class EventStore {
  @observable
  events: Map<string, IEvent> = new Map();

  @observable
  selectedEvent: IEvent | undefined;

  @observable
  isGlobalLoading = false;

  @observable
  isElementLoading = false;

  @observable
  elementLoadingTarget = "";

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
    this.isGlobalLoading = true;

    try {
      const events = await agent.events.getAll();

      runInAction(() => {
        events.forEach((event) => {
          event.date = event.date.split(".")[0];
          this.events.set(event.id, event);
          this.isGlobalLoading = false;
        });
      });
    } catch (error) {
      runInAction(() => {
        this.isGlobalLoading = false;
      });
    }
  };

  @action
  loadEvent = async (id: string) => {
    this.isGlobalLoading = true;
    let event = this.events.get(id);

    if (event) {
      this.selectedEvent = event;
      this.isGlobalLoading = false;

      return event;
    } else {
      this.isGlobalLoading = true;

      try {
        event = await agent.events.getEvent(id);

        event.date = event.date.split(".")[0];
        runInAction(() => {
          this.selectedEvent = event;
          this.events.set(event!.id, event!);
          this.isGlobalLoading = false;
        });

        return event;
      } catch (error) {
        runInAction(() => {
          this.isGlobalLoading = false;
        });
      }
    }
  };

  @action
  createEvent = async (event: IEvent) => {
    this.isElementLoading = true;

    try {
      event.id = await agent.events.create(event);

      runInAction(() => {
        this.events.set(event.id, event);

        this.selectedEvent = event;
        this.isElementLoading = false;
      });

      browserHistory.push(`${NavConstants.EVENTS}/${event.id}`);
    } catch (error) {
      runInAction(() => {
        this.isElementLoading = false;
      });
    }
  };

  @action
  updateEvent = async (event: IEvent) => {
    this.isElementLoading = true;

    try {
      await agent.events.update(event);

      runInAction(() => {
        this.events.set(event.id, event);

        this.selectedEvent = event;
        this.isElementLoading = false;
      });

      browserHistory.push(`${NavConstants.EVENTS}/${event.id}`);
    } catch (error) {
      runInAction(() => {
        this.isElementLoading = false;
      });
    }
  };

  @action
  deleteEvent = async (id: string, e: SyntheticEvent<HTMLButtonElement>) => {
    this.elementLoadingTarget = e.currentTarget.name;
    this.isElementLoading = true;

    try {
      await agent.events.delete(id);

      runInAction(() => {
        this.events.delete(id);

        this.isElementLoading = false;
        this.elementLoadingTarget = "";
      });
    } catch (error) {
      runInAction(() => {
        this.isElementLoading = false;
        this.elementLoadingTarget = "";
      });
    }
  };

  @action
  unselectEvent = () => (this.selectedEvent = undefined);
}

export default createContext(new EventStore());
