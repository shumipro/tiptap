/**
  Component: Menu Trigger
*/
var React   = require('react');
var Link    = require('react-router').Link;
var joinClasses = require('react/lib/joinClasses');

// Component Call
var {
} = require('../components');

export default class MenuTrigger extends React.Component {
  
  constructor(props) {
    super(props)
    
    this.state = {
    };
    
    this.text = {
      triggerLabel: "MENU"
    };
  }
  
  onClick() {
    alert('onClick Toggle Menu');
  }
  
  render() {
    
    var {
      triggerLabel
    } = this.text;
    
    return (
      <button className="Component_MenuTrigger" onClick={this.onClick}>
        <span className="MenuTrigger__label">
          {triggerLabel}
        </span>
      </button>
    );
  }
}