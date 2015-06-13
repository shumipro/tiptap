/**
  Component: Pusher Modal
*/
var React   = require('react');
var Link    = require('react-router').Link;
var joinClasses = require('react/lib/joinClasses');

// Component Call
var {
} = require('../components');

export default class PerformerProfile extends React.Component {
  
  text: {
    title: "Performer Profie",
    noDescription: "自己紹介を入力中"
  }
  
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  
  // get API to Props
  getDefaultProps() {
    return  {
      performerName: "Jonathan Frakes"
    };
  }
  
  render(){
    
    var {
      title,
      noDescription
    } = this.text;
    
    var {
      performerName,
      performerDescription
    } = this.props;
    
    return (
      <section className="Component_PerformerProfile">
        <h1 className="PerformerProfile__name">
          {title}
        </h1>
        <figure className="PerformerProfile__information">
          <figcaption>
            {performerName}
          </figcaption>
          { !!performerDescription &&
            <div className="PerformerProfile__description">
              {performerDescription}
            </div>
          }
          { !performerDescription &&
            <div className="PerformerProfile__description type_none">
              {noDescription}
            </div>
          }
        </figure>
      </section>
    );
  }
}