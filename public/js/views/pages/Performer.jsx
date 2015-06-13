/**
  Page: Performer
*/
var React   = require('react');
var Link    = require('react-router').Link;
var joinClasses = require('react/lib/joinClasses');

// Component Call
var {
  PerformerProfile,
  Tip
} = require('../components');

export default class Perfomer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  
  render(){
    return (
      <div className="Page_Performer">
        <PerformerProfile />
        <Tip />
      </div>
    );
  }
}