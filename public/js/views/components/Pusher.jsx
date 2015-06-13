/**
  Component: Pusher Modal
*/
var React   = require('react');
var Link    = require('react-router').Link;
var joinClasses = require('react/lib/joinClasses');

// Component Call
var ThumbsBackgroundImage = require('../components/ThumbsBackgroundImage.jsx');

export default class Pusher extends React.Component {
  
  constructor(props) {
    super(props)
    
    this.state = {
      userName: 'Pusher User Name',
      userIcon: '/images/sample/user-icon.png',
      payValue: 1
    }
    
    this.text = {
      thanks: 'Thanks!',
      doller: '$'
    }
  }
  
  render(){
    
    var {
      thanks,
      doller
    } = this.text;
    
    var {
      userName,
      userIcon,
      payValue
    } = this.state;
    
    return (
      <div className="Component_Pusher">
        <aside className="Pusher__modal">
          <figure className="Puser__user">
            <ThumbsBackgroundImage imgPath={userIcon} />
            <figurecaption className="user__name">
              {userName}
            </figurecaption>
            <div className="user__payment">
              <span className="payment__prefix">
                {thanks}
              </span>
              <strong className="payment__value">
                {payValue}
              </strong>
              <em className="payment__doller">
                {doller}
              </em>
            </div>
          </figure>
        </aside>
      </div>
    );
  }
}