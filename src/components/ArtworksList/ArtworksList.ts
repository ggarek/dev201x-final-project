import React = require("react");
import TypedReact = require("typed-react");

var { div, input, img, span, h2, h3, a } = React.DOM;

interface ArtworksListProps extends CoreProps {
  items: IArtwork[];
}

interface ArtworksListState {

}

class ArtworksList extends TypedReact.Component<ArtworksListProps, ArtworksListState> {
  render() {
    return div({ className: 'painter-artworks'},
      this.props.items.map(this._renderArtwork)
    );
  }

  private _renderArtwork(item: IArtwork) {
    return div({ className: 'painter-artwork' },
      h2({ className: 'painter-artwork__title'}, item.title),
      img({ src: item.thumbnail }),
      div({ className: 'painter-artwork__item'},
        h3({ className: 'painter-artwork__item__header'}, 'Description'),
        span({ className: 'painter-artwork__item__value'}, item.description)
      ),
      a({ className: 'wiki-link', href: item.wikiUrl}, 'Wikipedia')
    );
  }
}

export default React.createFactory(TypedReact.createClass(ArtworksList));