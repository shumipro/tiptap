/**
  Component: Header
*/
var React   = require('react');
var Link    = require('react-router').Link;
var joinClasses = require('react/lib/joinClasses');

var PageHistoryStore  = require('../../stores/PageHistoryStore');

// Component Call
var MenuTrigger = require('../components/MenuTrigger.jsx');
var PayCounter = require('../components/PayCounter.jsx');

export default class Header extends React.Component {
  
  constructor(props) {
    super(props)
    
    this.state = PageHistoryStore.getState();
  }
  
  onClick() {
    history.back();
  }
  
  render(){
    
    var {
      isHistoryBack
    } = this.state;
    
    return (
      <header className="layout_header Component_Header">
        { isHistoryBack &&
          <button className="Header__prev" onClick={this.onClick} />
        }
        <PayCounter />
        <MenuTrigger />
      </header>
    );
  }
  
  /* Storeで更新があった際にStoreからstateを受け取ってsetStateするMethod */
  _setState(state) {
    this.setState(state);
  }

  componentDidMount() {
    PageHistoryStore.on('change:state', this._setState.bind(this));
  }
  componentWillUnMount() {
    PageHistoryStore.removeListener('change:state', this._setState.bind(this));
  }
  
  
}