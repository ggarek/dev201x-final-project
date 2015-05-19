import React = require("react");
import TypedReact = require("typed-react");

var { div,  noscript, span, h2, a} = React.DOM;

interface ProjectInfoProps {}

interface ProjectInfoState {}

class ProjectInfo extends TypedReact.Component<ProjectInfoProps, ProjectInfoState> {
  render() {
    return div({ className: 'project-info' },

      div({ className: 'project-info__header'}, 'This site is created by'),
      div({ className: 'project-info__text project-info__author' },
        span(null , 'Igor Ovsiannikov')
      ),

      div({ className: 'project-info__header'}, 'As a final project for'),
      div({ className: 'project-info__text' },
        a({ className: 'project-info__link', href: 'https://courses.edx.org/courses/course-v1:Microsoft+DEV201x+2015_T2/' }, 'Microsoft: DEV201x Introduction to TypeScript')
      ),

      div({ className: 'project-info__header'}, 'Created with'),
      div({ className: 'project-info__text' },
        a({ className: 'project-info__link', href: 'http://www.typescriptlang.org/'}, 'Typescript' ),
        span({ className: 'h-separator' }, '|'),
        a({ className: 'project-info__link', href: 'https://facebook.github.io/react/'}, 'React' )
      ),


      div({ className: 'project-info__header'}, 'Powered by'),
      div({ className: 'project-info__text' },
        a({ className: 'project-info__link', href: 'http://wiki.dbpedia.org/'}, 'DBPedia' ),
        span({ className: 'h-separator' }, '|'),
        a({ className: 'project-info__link', href: 'https://github.com/'}, 'Github' )
      ),

      div({ className: 'project-info__header'}, 'My contacts'),
      div({ className: 'project-info__text' },
        a({ className: 'project-info__link', href: 'https://ru.linkedin.com/pub/igor-ovsyannikov/70/b9/98' }, 'linkedin'),
        span({ className: 'h-separator' }, '|'),
        a({ className: 'project-info__link', href: 'https://github.com/ggarek' }, 'github')
      )
    )
  }
}

export default React.createFactory(TypedReact.createClass(ProjectInfo));