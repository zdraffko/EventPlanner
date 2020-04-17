import { createContext } from "react";
import EventStore from "./eventStore";
import UserStore from "./userStore";
import CommonStore from "./commonStore";

class RootStore {
  EventStore: EventStore = new EventStore(this);
  UserStore: UserStore = new UserStore();
  CommonStore: CommonStore = new CommonStore();
}

const RootStoreContext = createContext(new RootStore());

export { RootStore, RootStoreContext };
