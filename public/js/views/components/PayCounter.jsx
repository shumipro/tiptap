/**
  Component: Pay Counter
*/
var React   = require('react');
var Link    = require('react-router').Link;
var joinClasses = require('react/lib/joinClasses');

// Component Call
var {
} = require('../components');

export default class PayCounter extends React.Component {
  
  constructor(props) {
    super(props)
    
    this.state = {
      count: 0
    }
    
    this.text = {
      payButtonLabel: 'Pay'
    }
    
  }
  
  render(){
    
    var {
      payButtonLabel
    } = this.text;
    
    var {
      count
    } = this.state;
    
    return (
      <div className="Component_PayCount">
        { count > 0 && 
          <Link to="PayConfirm">
            <button className="PayCounte__button">
              {payButtonLabel}
            </button>
            <i className="PayCounte__counter">
              {count}
            </i>
          </Link>
        }
      </div>
    );
  }
}