/**
  Component: Preloader
*/
var React   = require('react');
var Link    = require('react-router').Link;
var joinClasses = require('react/lib/joinClasses');

// Component Call
var {
} = require('../components');

export default class Preloader extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  
  render(){
    
    return (
      <i className="Component_Preloader">
        load...
      </i>
    );
  }
}