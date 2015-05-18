import Store from './Store';

class Core {
  public store: Store;

  constructor() {
    this.store = new Store();
  }
}

export default Core;
