import Painter from './models/Painter';
import Artwork from './models/Artwork';
import NotifyChange from './NotifyChange';
import queryArtworks from './queries/Artworks';

/**
 * SPARQL Queries
 */
const QUERY_PAINTERS = `
select
  (COUNT(?artwork) as ?artwork_count)
  ?paitner
  ?paitner as ?painter_dbpedia_resource
  ?painter_id
  ?painter_name
  ?painter_wiki_url
  ?y1 as ?painter_birth_place
  ?painter_birth_date
  ?y3 as ?painter_death_place
  ?painter_death_date
where {
  ?artwork a dbpedia-owl:Artwork
  ; dbpprop:artist ?paitner
  .

  ?paitner foaf:isPrimaryTopicOf ?painter_wiki_url
  ; dbpedia-owl:wikiPageID ?painter_id
  ; rdfs:label ?painter_name
  ; dbpedia-owl:birthPlace ?y
  ; dbpedia-owl:birthDate ?painter_birth_date
  ; dbpedia-owl:deathPlace ?y2
  ; dbpedia-owl:deathDate ?painter_death_date
  .

  ?y rdfs:label ?y1 .
  ?y2 rdfs:label ?y3 .

  filter ( EXISTS {?paitner a dbpedia-owl:Person} )
  filter (lang(?painter_name)='en')
  filter (lang(?y1)='en')
}
group by
  ?painter_id
  ?paitner
  ?painter_name
  ?painter_wiki_url
  ?y1
  ?painter_birth_date
  ?y3
  ?painter_death_date
having COUNT(?artwork) > 0
limit 100
`;



class Store extends NotifyChange implements IStore {
  private _painters: Painter[] = [];
  private _paintersById: Dictionary<Painter> = {};
  private _artworksByPainterId: Dictionary<Artwork[]> = {};
  private _currentPainter: Painter;

  constructor() {
    super();

    fetchDbpedia(QUERY_PAINTERS, (error: Error, data: any) => {
      if(error) {
        console.error('error loading painters!\n', error);
        return;
      }

      // Create painters and build dictionary in one go
      this._painters = createPainters(data, (painter:Painter) => this._paintersById[painter.id] = painter);
      this._currentPainter = this._painters[0];
      this.emitChange();
    })
  }

  /**
   * Public API
   */
  public getPainters() {
    return this._painters.slice(0);
  }

  public getCurrentPainter(): IPainter {
    return this._currentPainter;
  }

  public getCurrentArtworks(): IArtwork[] {
    var p = this.getCurrentPainter();
    var artworks: IArtwork[];

    // Painter is not selected
    if(!p) return [];

    artworks = this._artworksByPainterId[p.id];

    if(!artworks) {
      // Did not fetch artworks yet
      this._fetchArtworks(p);
      return [];
    }

    return artworks;
  }

  public handleSetCurrentPainter(id:string) {
    this._currentPainter = this._paintersById[id];

    this.emitChange();
  }

  /**
   * Private API
   */
  private _fetchArtworks(painter: IPainter) {
    fetchDbpedia(queryArtworks(painter), (error: Error, data: any) => {
      if(error) {
        console.error('error loading painters!\n', error);
        return;
      }

      this._artworksByPainterId[painter.id] = createArtworks(data);
      this.emitChange();
    });
  }
}

export default Store;

/**
 * HELPERS
 */
function fetch(method: string, url: string, callback:(error:Error, data:any) => void) {
  var xhr = new XMLHttpRequest();

  xhr.open(method, url);
  xhr.onreadystatechange = function () {
    var error:Error = null;

    if(xhr.status === 200 && xhr.readyState === 4) {
      try {
        var result = JSON.parse(xhr.responseText);
      } catch(e) {
        error = e;
      }

      if(error) callback(error, null);
      else callback(null, result);
    }
  };

  xhr.send();
}

function fetchDbpedia(query: string, callback:(error:Error, data:any) => void, endpoint: string = 'http://dbpedia.org/sparql') {
  var encodedQuery = encodeURIComponent(query);
  var url = endpoint + '?query=' + encodedQuery + '&format=' + encodeURIComponent('application/sparql-results+json');

  fetch('GET', url, callback);
}

function createPainters(data: any, callback?: (painter:Painter) => void): Painter[] {
  return data.results.bindings.map((binding: any) => {
    var p = new Painter;

    p.id = binding['painter_id'].value;
    p.name = binding['painter_name'].value;
    p.birthPlace = binding['painter_birth_place'].value;
    p.wikiUrl = binding['painter_wiki_url'].value;
    p.birthDate = binding['painter_birth_date'].value;
    p.deathPlace = binding['painter_death_place'].value;
    p.deathDate = binding['painter_death_date'].value;
    p.dbpediaResource = binding['painter_dbpedia_resource'].value;

    if(callback) callback(p);

    return p;
  })
}

function createArtworks(data: any): Artwork[] {
  return data.results.bindings.map((binding: any) => {
    var o = new Artwork();
    var b = binding;

    o.id = b['artwork_id'].value;
    o.title = b['artwork_title'].value;
    o.wikiUrl = b['artwork_wiki_url'].value;
    o.description = b['artwork_description'].value;
    o.thumbnail = b['artwork_thumbnail'].value;

    return o;
  })
};
