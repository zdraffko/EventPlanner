import { observable, computed, action, runInAction } from "mobx";
import { browserHistory } from "../..";
import * as NavConstants from "../constants/navigationalConstants";
import { IUser, IUserLogInFormValues, IUserRegisterFormValues } from "../models/userModels";
import agent from "../api/agent";
import { RootStore } from "./rootStore";

class UserStore {
  private readonly RootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.RootStore = rootStore;
  }

  @observable
  user: IUser | null = null;

  @observable
  hasRegistered = false;

  @computed
  get isLoggedIn() {
    return !!this.user;
  }

  @action
  logIn = async (loginInfo: IUserLogInFormValues) => {
    const user = await agent.users.logIn(loginInfo);

    runInAction(() => {
      this.user = user;
      this.hasRegistered = false;
    });

    this.RootStore.CommonStore.setToken(user.token);
    this.RootStore.CommonStore.closeModal();
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
  register = async (registerInfo: IUserRegisterFormValues) => {
    await agent.users.register(registerInfo);

    runInAction(() => (this.hasRegistered = true));
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
