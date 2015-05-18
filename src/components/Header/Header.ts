import React = require("react");
import TypedReact = require("typed-react");

var { div, input, select, option } = React.DOM;

interface HeaderProps extends CoreProps {
}

interface HeaderState {

}

class Header extends TypedReact.Component<HeaderProps, HeaderState> {
  render() {
    return div(null,
      select(null,
        this.props.core.store.getPainters().map(this._renderPainter)
      )
    );
  }

  private _renderPainter(painter: IPainter) {
    return option({ value: painter.id }, painter.name);
  }
}

export default React.createFactory(TypedReact.createClass(Header));