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
  Header,
  Pusher
} = require('./views/components');

// Page Component Call
var {
  Top,
  Performer,
  PayConfirm,
  History
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
        <Pusher />
        <RouteHandler />
      </div>
    );
  }
}

var routes = (
  <Route name='Top' path='/' handler={App}>
  
    {/* Top Page */}
    <DefaultRoute handler={Top} />
    
    {/* Performer Page */}
    <Route handler={Performer} path='/performer/:performerId'  />
    
    {/* PayHistory Page */}
    <Route handler={History} path='/history/pay/' />
  
    {/* GivenHistory Page */}
    <Route handler={History} path='/history/given/' />
    
    {/* Pay Confirm Page */}
    <Route handler={PayConfirm} />
  
  </Route>
);

// render
Router.run(routes, (Handler, state)=> {
  React.render(<Handler />, document.getElementById("app"));
});