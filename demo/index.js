console.log('SPARQL playground');

var btnQuery = document.getElementById('btnQuery');
var txtQuery = document.getElementById('txtQuery');

btnQuery.addEventListener('click', function () {
  var endpoint = 'http://dbpedia.org/sparql';
  var rawQuery = txtQuery.value;
  var encodedQuery = encodeURIComponent(rawQuery);
  var url = endpoint + '?query=' + encodedQuery + '&format=' + encodeURIComponent('application/sparql-results+json');

  var xhr = new XMLHttpRequest();

  xhr.open('GET', url);
  //xhr.setRequestHeader('Content-Type', 'application/sparql-results+json');
  xhr.onreadystatechange = function () {
    if(xhr.status === 200 && xhr.readyState === 4) {
      try {
        var result = JSON.parse(xhr.responseText);
        console.log(result);
      } catch(e) {
        console.log(e);
      }
    }
  };

  console.log('Query!');
  xhr.send();
});
