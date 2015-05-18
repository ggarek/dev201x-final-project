/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings/local.d.ts" />
/// <reference path="../node_modules/typed-react/typed-react.d.ts" />

import React = require('react');
import App from './components/App/App';
import Core from './Core';

React.render(App({ core: new Core() }), document.getElementById('react-host'));


