import React = require("react");
import TypedReact = require("typed-react");

var { div, input, select, option, label, noscript, table, td, tr, span} = React.DOM;

interface PainterInfoProps extends CoreProps {
  painter: IPainter
}

interface PainterInfoState {

}

class PainterInfo extends TypedReact.Component<PainterInfoProps, PainterInfoState> {
  render() {
    var p = this.props.painter;

    if(!p) return noscript(null);

    return div(null,
      div({ className: 'painter-info__name' }, p.name),
      div({ className: 'painter-info__item'},
        span({ className: 'painter-info__item__header'}, 'Birth Place'),
        span({ className: 'painter-info__item__value'}, p.birthPlace)
      ),
      div({ className: 'painter-info__item'},
        span({ className: 'painter-info__item__header'}, 'Birth Date'),
        span({ className: 'painter-info__item__value'}, p.birthDate)
      ),
      div({ className: 'painter-info__item'},
        span({ className: 'painter-info__item__header'}, 'Death Place'),
        span({ className: 'painter-info__item__value'}, p.deathPlace)
      ),
      div({ className: 'painter-info__item'},
        span({ className: 'painter-info__item__header'}, 'Death Date'),
        span({ className: 'painter-info__item__value'}, p.deathDate)
      )
    )
  }
}

export default React.createFactory(TypedReact.createClass(PainterInfo));