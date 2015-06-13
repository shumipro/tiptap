import { polyfill } from 'es6-promise'
polyfill();

//import getUA from './utils/ua'
import React from 'react'
import joinClasses from 'react/lib/joinClasses'
import Router from 'react-router'

import CoinFallCrl from './views/components/CoinFallCtrl'

var coinFallCtrlNode = document.getElementById('coinFallCtrl')
coinFallCtrlNode && React.render(<CoinFallCrl />, coinFallCtrlNode)

/**
  RootStoreを定義とか...
  var RootStore = require('./stores/RootStore');
*/


/**
  Router定義するならここに書いていく
  
  
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  
  render(){
    return (
      <div className="Layout_container">
        <Preloader />
        <MenuModal />
        <main className={joinClasses(
          'layout_main'
        )}>
          <RouteHandler />
        </main>
      </div>
    )
  }
}


var routes = (
  <Route name='Top' path='/' handler={App}>
  
    <DefaultRoute handler={Top} />
    <NotFoundRoute handler={NotFound} />
  
  </Route>
);

// render
Router.run(routes, (Handler, state)=> {
  React.render(<Handler />, document.getElementById("app"));
});

*/

var {
  Route,
  DefaultRoute,
  NotFoundRoute,
  RouteHandler
} = Router;

// Components Call
var {
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
      <div>
        <RouteHandler />
      </div>
    );
  }
}

var routes = (
  <Route name='Top' path='/' handler={App}>
  
    <DefaultRoute handler={Top} />
    {/*<NotFoundRoute handler={NotFound} /> */}
  
  </Route>
);

// render
Router.run(routes, (Handler, state)=> {
  React.render(<Handler />, document.getElementById("app"));
});