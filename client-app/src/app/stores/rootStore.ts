import { createContext } from "react";
import EventStore from "./eventStore";
import UserStore from "./userStore";
import CommonStore from "./commonStore";
import { configure } from "mobx";

configure({ enforceActions: "always" });

class RootStore {
  EventStore: EventStore = new EventStore(this);
  UserStore: UserStore = new UserStore(this);
  CommonStore: CommonStore = new CommonStore();
}

const RootStoreContext = createContext(new RootStore());

export { RootStore, RootStoreContext };
