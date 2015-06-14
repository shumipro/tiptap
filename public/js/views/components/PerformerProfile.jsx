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
  noDescription: "【サンプル】はじめまして。私はピーターといいます。普段はフランス・パリの凱旋門の真下でサーカス芸をしています。一番の得意技はバルーン・パフォーマンスです:)是非見に来てくださいね♪"
}

export default class PerformerProfile extends React.Component {


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
    } = text;

    var {
      performerId,
      performerName,
      performerDescription,
      performerIconImage
    } = this.props;

    return (
      <section className="Component_PerformerProfile">
        <ThumbsBackgroundImage imagePath={performerIconImage} />
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
