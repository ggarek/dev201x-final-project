import Painter from './models/Painter';
import NotifyChange from './NotifyChange';

/**
 * SPARQL Queries
 */
const QUERY_PAINTERS = `
select
    ?painter
  , ?painter_id
  , ?painter_name
  , ?painter_birth_place
  , ?painter_birth_date
  , ?painter_death_place
  , ?painter_death_date
  , ?painter_wiki_url
where {
  ?painter a dbpedia-owl:Painter
  ; dbpedia-owl:wikiPageID ?painter_id
  ; foaf:isPrimaryTopicOf ?painter_wiki_url
  ; rdfs:label ?painter_name
  ; dbpedia-owl:birthYear ?painter_birth_date
  ; dbpedia-owl:deathYear ?painter_death_date
  .

  ?painter dbpedia-owl:birthPlace ?y .
  {
    select
      ?y
      group_concat(?z ; separator=", ") as ?painter_birth_place
    where {
      ?y rdfs:label ?z .
      filter (lang(?z)='en')
    } group by ?y
  }

  ?painter dbpedia-owl:deathPlace ?y1 .
  {
    select
      ?y1
      group_concat(?z1 ; separator=", ") as ?painter_death_place
    where {
      ?y1 rdfs:label ?z1 .
      filter (lang(?z1)='en')
    } group by ?y1
  }
  filter (lang(?painter_name)='en')
}
group by
    ?painter_id
    ?painter
    ?painter_name
    ?painter_wiki_url
limit 100
`;

class Store extends NotifyChange implements IStore {
  private _painters: Painter[] = [];

  constructor() {
    super();

    fetchDbpedia(QUERY_PAINTERS, (error: Error, data: any) => {
      if(error) {
        console.error('error loading painters!\n', error);
        return;
      }

      this._painters = createPainters(data);
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
    return this._painters[0];
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

function createPainters(data: any): Painter[] {
  return data.results.bindings.map((binding: any) => {
    var p = new Painter;

    p.id = binding['painter_id'].value;
    p.name = binding['painter_name'].value;
    p.birthPlace = binding['painter_birth_place'].value;
    p.wikiUrl = binding['painter_wiki_url'].value;
    p.birthDate = binding['painter_birth_date'].value;
    p.deathPlace = binding['painter_death_place'].value;
    p.deathDate = binding['painter_death_date'].value;

    return p;
  })
}
