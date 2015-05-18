import Store from './Store';

class Core implements ICore {
  public store: Store;
  public actions: ICoreActions;

  constructor() {
    var core = this;

    this.store = new Store();

    this.actions = <ICoreActions> {
      selectPainter: (id:string) => {
        core.store.handleSetCurrentPainter(id);
      }
    }
  }
}

export default Core;
