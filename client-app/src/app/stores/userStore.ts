import { observable, computed, action, runInAction } from "mobx";
import { browserHistory } from "../..";
import * as NavConstants from "../constants/navigationalConstants";
import { IUser, IUserLogInFormValues } from "../models/userModels";
import agent from "../api/agent";

class UserStore {
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

    browserHistory.push(NavConstants.EVENTS);
  };
}

export default UserStore;
