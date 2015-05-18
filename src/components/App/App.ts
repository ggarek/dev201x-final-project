import React = require("react");
import TypedReact = require("typed-react");

import Header from '../Header/Header';
import PainterInfo from '../PainterInfo/PainterInfo';
import ArtworksList from '../ArtworksList/ArtworksList';

var { div } = React.DOM;

interface AppProps extends CoreProps {
}

interface AppState {}

class App extends TypedReact.Component<AppProps, AppState> {
  componentDidMount() {
    this.props.core.store.addChangeListener(this._handleStoreChange);
  }

  componentWillUnmount() {
    this.props.core.store.removeChangeListener(this._handleStoreChange);
  }

  render() {
    return div(null,
      Header({ core: this.props.core }),
      div({ className: 'painter-details' },
        PainterInfo({ core: this.props.core, painter: this.props.core.store.getCurrentPainter() }),
        ArtworksList({ core: this.props.core, items: this.props.core.store.getCurrentArtworks() })
      ));
  }

  private _handleStoreChange() {
    this.forceUpdate();
  }
}

var app = React.createFactory(TypedReact.createClass(App));

export default app;
