import { observable, action } from "mobx";

export const tokenName = "EventPlannerToken";

class CommonStore {
  @observable
  isGlobalLoading = false;

  @observable
  isElementLoading = false;

  @observable
  elementLoadingTarget = "";

  @observable
  token: string | null = window.localStorage.getItem(tokenName);

  @action
  setToken = (token: string) => {
    this.token = token;
    window.localStorage.setItem(tokenName, token);
  };

  @action
  removeToken = () => {
    this.token = null;
    window.localStorage.removeItem(tokenName);
  };
}

export default CommonStore;
