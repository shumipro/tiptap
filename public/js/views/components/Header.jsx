/**
  Component: Header
*/
var React   = require('react');
var Link    = require('react-router').Link;
var joinClasses = require('react/lib/joinClasses');

// Component Call
var MenuTrigger = require('../components/MenuTrigger.jsx');
var PayCounter = require('../components/PayCounter.jsx');

export default class Reply extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      isHistoryBack: false
    }
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
}