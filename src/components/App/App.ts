import React = require("react");
import TypedReact = require("typed-react");
import Core from '../../Core';

import Header from '../Header/Header';

var { div } = React.DOM;

interface AppProps {
  core: Core
}

interface AppState {}

class App extends TypedReact.Component<AppProps, AppState> {
  render() {
    return div(null,
      Header(null),
      div(null, 'Hello. That`s App')
    );
  }
}

var app = React.createFactory(TypedReact.createClass(App));

export default app;
