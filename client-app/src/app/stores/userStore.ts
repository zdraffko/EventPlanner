import { observable, computed, action, runInAction } from "mobx";
import { browserHistory } from "../..";
import * as NavConstants from "../constants/navigationalConstants";
import { IUser, IUserLogInFormValues } from "../models/userModels";
import agent from "../api/agent";
import { RootStore } from "./rootStore";

class UserStore {
  private readonly RootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.RootStore = rootStore;
  }

  @observable
  user: IUser | null = null;

  @computed
  get isLoggedIn() {
    return !!this.user;
  }

  @action
  logIn = async (loginInfo: IUserLogInFormValues) => {
    const user = await agent.users.logIn(loginInfo);

    runInAction(() => {
      this.user = user;
    });

    this.RootStore.CommonStore.setToken(user.token);
    browserHistory.push(NavConstants.EVENTS);
  };

  @action
  logOut = () => {
    runInAction(() => {
      this.user = null;
    });

    this.RootStore.CommonStore.removeToken();
    browserHistory.push(NavConstants.HOME);
  };

  @action
  getCurrentUser = async () => {
    try {
      const user = await agent.users.getCurrentUser();

      runInAction(() => {
        this.user = user;
      });
    } catch (error) {}
  };
}

export default UserStore;
