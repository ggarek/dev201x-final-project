import React = require("react");
import TypedReact = require("typed-react");

var { div, input, select, option, h2 } = React.DOM;

interface HeaderProps extends CoreProps {

}

interface HeaderState {

}

class Header extends TypedReact.Component<HeaderProps, HeaderState> {
  render() {
    return div({ className: 'header' },
      h2(null, "World Artist and Paintings | DEV201x Final Project"),
      select({ className: 'header__painter-select', onChange: this._handlePainterChange },
        this.props.core.store.getPainters().map(this._renderPainter)
      )
    );
  }

  private _renderPainter(painter: IPainter) {
    return option({ value: painter.id }, painter.name);
  }

  private _handlePainterChange(e:any) {
    var painterId = e.target.value;

    this.props.core.actions.selectPainter(painterId);
  }
}

export default React.createFactory(TypedReact.createClass(Header));