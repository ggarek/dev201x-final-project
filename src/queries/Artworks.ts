export default function (painter: IPainter):string {
  return `
    select
        ?artwork
        ?artwork_id
        ?artwork_thumbnail
        ?artwork_wiki_url
        ?artwork_title
        ?artwork_description
    where {
      ?artwork a dbpedia-owl:Artwork
      ; dbpedia-owl:wikiPageID ?artwork_id
      ; dbpedia-owl:author ?author
      ; dbpedia-owl:thumbnail ?artwork_thumbnail
      ; foaf:isPrimaryTopicOf ?artwork_wiki_url
      ; dbpprop:title ?artwork_title
      ; dbpedia-owl:abstract ?artwork_description
      .

      filter (?author = <${painter.dbpediaResource}>)
      filter (lang(?artwork_description) = 'en')
    }
  `;
}
