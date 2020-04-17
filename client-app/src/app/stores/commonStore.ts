import { observable, configure } from "mobx";

configure({ enforceActions: "always" });

class CommonStore {
  @observable
  isGlobalLoading = false;

  @observable
  isElementLoading = false;

  @observable
  elementLoadingTarget = "";
}

export default CommonStore;
