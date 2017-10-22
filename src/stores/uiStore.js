import {action, autorun, computed, observable} from 'mobx';

class UIStore {

  @observable requestCount = 0;
  @observable isError = false;
  @observable isSuccess = false;
  @observable isAlert = false;
  @observable message = null;

  constructor() {
    autorun(() => {
      // eslint-disable-next-line no-console
      console.log(this.requestCount);
    });
  }

  @action
  setSuccess = (data) => {
    this.isSuccess = true;
    this.message = data;
  };

  @action
  resetSuccess = () => {
    this.isSuccess = false;
    this.message = null;
  };

  @action
  setError = (err) => {
    this.isError = true;
    this.message = err;
  };

  @action
  resetError = () => {
    this.isError = false;
    this.message = null;
  };

  @action
  setAlert = (value) => {
    this.isAlert = value;
  };

  @action
  setAdWordsProperty = (key, value) => {
    this.adWords[key] = value;
  };

  @computed get isLoading() {
    return this.requestCount > 0;
  }

  @action
  beforeFetch = () => {
    this.requestCount++;

  };

  @action
  afterFetch = () => {
    this.requestCount--;
  };
}

export default new UIStore();
