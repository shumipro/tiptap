/**
  Component: Pusher Modal
*/
var React   = require('react');
var Link    = require('react-router').Link;
var joinClasses = require('react/lib/joinClasses');

// Component Call
var ThumbsBackgroundImage = require('../components/ThumbsBackgroundImage');

// constants
var text = {
  title: "Performer Profie",
  noDescription: "..."
}

export default class PerformerProfile extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render(){

    var {
      title,
      noDescription
    } = text;

    var {
      performerId,
      performerName,
      performerDescription,
      performerIconImage
    } = this.props;
    console.log(this.props);
    return (
      <section className="Component_PerformerProfile">
        <ThumbsBackgroundImage imagePath={performerIconImage} />
        
        <h1 className="PerformerProfile__heading">
          {title}
        </h1>
        <figure className="PerformerProfile__information">
          <figcaption className="PerformerProfile__name">
            {performerName}
          </figcaption>
          { !performerDescription &&
            <div className="PerformerProfile__description type_none">
              {noDescription}
            </div>
          }
          { !!performerDescription &&
            <div className="PerformerProfile__description">
              {performerDescription}
            </div>
          }
        </figure>
        
        
      </section>
    );
  }
}

PerformerProfile.defaultProps = {
  performerId: 0,
  performerName: 'Jonathan Frakes',
  performerDescription: 'はじめまして。私はピーターといいます。普段はフランス・パリの凱旋門の真下でサーカス芸をしています。一番の得意技はバルーン・パフォーマンスです:) 是非見に来てくださいね！',
  performerIcon: '/images/samples/performer.png',
  performerIconImage: '/images/samples/performer.png'
}
