/**
  Component: TabNav
*/
var React   = require('react');
var Link    = require('react-router').Link;
var joinClasses = require('react/lib/joinClasses');

// Component Call
var {
} = require('../components');

export default class TabNav extends React.Component {
  
  text: {
    pay: "Pay",
    given: "Given"
  }
  
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  
  render(){
    
    var {
      pay,
      given
    } = this.text;
    
    return (
      <nav className="Component_TabNav">
        <button className="TabNav__item type_pay">
          {pay}
        </button>
        <button className="TabNav__item type_given">
          {given}
        </button>
      </nav>
    );
  }
}