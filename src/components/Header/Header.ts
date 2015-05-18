import React = require("react");
import TypedReact = require("typed-react");
import Core from '../../Core';

var { div, input, select, option } = React.DOM;

interface HeaderState {

}

interface HeaderProps {

}

class Header extends TypedReact.Component<HeaderProps, HeaderState> {
  render() {
    return div(null,
      input({ type: 'text' })
    );
  }
}

export default React.createFactory(TypedReact.createClass(Header));