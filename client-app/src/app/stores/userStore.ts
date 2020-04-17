import { observable, computed, action, configure } from "mobx";
import { IUser, IUserLogInFormValues } from "../models/userModels";
import agent from "../api/agent";

configure({ enforceActions: "always" });

class UserStore {
  @observable
  user: IUser | null = null;

  @computed
  get isLoggedIn() {
    return !!this.user;
  }

  @action
  logIn = async (loginInfo: IUserLogInFormValues) => {
    try {
      this.user = await agent.users.logIn(loginInfo);
    } catch (error) {
      console.log(error);
    }
  };
}

export default UserStore;
