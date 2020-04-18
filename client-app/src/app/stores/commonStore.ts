import { observable } from "mobx";

class CommonStore {
  @observable
  isGlobalLoading = false;

  @observable
  isElementLoading = false;

  @observable
  elementLoadingTarget = "";
}

export default CommonStore;
