/**
  Component: Pusher Modal
*/
var React   = require('react');
var Link    = require('react-router').Link;
var joinClasses = require('react/lib/joinClasses');

// Component Call
var ThumbsBackgroundImage = require('../components/ThumbsBackgroundImage');

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
      performerId: 0,
      performerName: 'Jonathan Frakes',
      performerDescription: 'パフォーマの説明文ですよ！brタグ使いたい場合は魔法が必要...',
      performerIcon: '/images/sample/user-icon_performer.png'
    };
  }
  
  render(){
    
    var {
      title,
      noDescription
    } = this.text;
    
    var {
      performerId,
      performerName,
      performerDescription,
      performerIconImage
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
          <ThumbsBackgroundImage imgPath={performerIconImage} />
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