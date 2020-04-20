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

  @observable.shallow
  modal = {
    isOpen: false,
    content: null,
  };

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

  @action
  openModal = (component) => {
    this.modal.isOpen = true;
    this.modal.content = component;
  };

  @action
  closeModal = () => {
    this.modal.isOpen = false;
    this.modal.content = null;
  };
}

export default CommonStore;
