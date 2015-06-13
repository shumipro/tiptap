/**
  Component: Pusher Modal
*/
var React   = require('react');
var Link    = require('react-router').Link;
var joinClasses = require('react/lib/joinClasses');

// Component Call
var {
} = require('../components');

export default class Pusher extends React.Component {
  
  text: {}
  
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  
  render(){
    
    var {} = this.text;
    
    return (
      <aside className="Component_Pusher">
        Pusher Modal
      </aside>
    );
  }
}