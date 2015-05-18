import Store from './Store';

class Core implements ICore {
  public store: Store;

  constructor() {
    this.store = new Store();
  }
}

export default Core;
