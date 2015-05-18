interface INotifyChange {
  addChangeListener(callback:()=>void): void;
  removeChangeListener(callback: ()=>void): void;
}

interface IStore extends INotifyChange {
  getPainters(): IPainter[];
  getCurrentPainter(): IPainter;
  getCurrentArtworks(): IArtwork[];
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
  dbpediaResource: string;
}

interface IArtwork {
  id: string;
  title: string;
  wikiUrl: string;
  thumbnail: string;
  description: string;
}

/**
 * Common
 */
interface Dictionary<T> {
  [index: string]: T;
}
