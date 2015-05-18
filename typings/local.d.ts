interface INotifyChange {
  addChangeListener(callback:()=>void): void;
  removeChangeListener(callback: ()=>void): void;
}

interface IStore extends INotifyChange {
  getPainters(): IPainter[];
  getCurrentPainter(): IPainter;
}

interface ICore {
  store: IStore;
}

interface CoreProps {
  core: ICore;
}

/**
 * Models
 */
interface IPainter {
  id: string;
  name: string;
  birthPlace: string;
  wikiUrl: string;
  birthDate: string;
  deathPlace: string;
  deathDate: string;
}
