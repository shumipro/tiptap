/**
  Page: History [Pay, Given]
*/
var React   = require('react');
var Link    = require('react-router').Link;
var joinClasses = require('react/lib/joinClasses');

var PageHistoryActions  = require('../../actions/PageHistoryActions');

// Component Call
var {
} = require('../components');

export default class History extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  
  render(){
    return (
      <div className="Page_History">
        History List
      </div>
    );
  }
  
  componentDidMount() {
    PageHistoryActions.onHistoryBack();
  }
}