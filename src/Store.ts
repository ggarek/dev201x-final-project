import Painter from './models/Painter';

/**
 * SPARQL Queries
 */
const QUERY_PAINTERS = `
select
    ?painter
  , ?painter_name
  , ?painter_birth_place
  , ?painter_wiki_url
where {
  ?painter a dbpedia-owl:Painter
  ; foaf:isPrimaryTopicOf ?painter_wiki_url
  ; dbpprop:name ?painter_name
  ; dbpedia-owl:birthPlace ?painter_birth_place
  .

  filter (lang(?painter_name)='en')
} limit 100
`;

class Store {
  private _painters: Painter[];

  constructor() {
    fetchDbpedia(QUERY_PAINTERS, (error: Error, data: any) => {
      console.log(error, createPainters(data));
    })
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

    p.name = binding['painter_name'].value;
    p.birthPlace = binding['painter_birth_place'].value;
    p.wikiUrl = binding['painter_wiki_url'].value;

    return p;
  })
}
