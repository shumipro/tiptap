import { polyfill } from 'es6-promise'
polyfill();

import React from 'react'
import joinClasses from 'react/lib/joinClasses'
import Router from 'react-router'
import getUA from './utils/ua'

/**
  RootStoreを定義とか...
  var RootStore = require('./stores/RootStore');
*/


/**
  Router
*/
var {
  Route,
  DefaultRoute,
  NotFoundRoute,
  RouteHandler
} = Router;

// Components Call
var {
  Header
} = require('./views/components');

// Page Component Call
var {
  Top
} = require('./views/pages');

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  
  render(){
    return (
      <div className="layout_view">
        <Header />
        <RouteHandler />
      </div>
    );
  }
}

var routes = (
  <Route name='Top' path='/' handler={App}>
  
    <DefaultRoute handler={Top} />
  
  </Route>
);

// render
Router.run(routes, (Handler, state)=> {
  React.render(<Handler />, document.getElementById("app"));
});