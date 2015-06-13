/**
  Component: History List
*/
var React   = require('react');
var Link    = require('react-router').Link;
var joinClasses = require('react/lib/joinClasses');

// Component Call
var {
} = require('../components');

export default class HistoryList extends React.Component {
  
  text: {}
  
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  
  render(){
    
    var {} = this.text;
    
    return (
      <section className="Component_HistoryList">
        History List...
      </section>
    );
  }
}