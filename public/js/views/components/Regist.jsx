/**
  Component: Reply Modal
*/
var React   = require('react');
var Link    = require('react-router').Link;
var joinClasses = require('react/lib/joinClasses');

// Component Call
var {
} = require('../components');

export default class Regist extends React.Component {
  
  constructor(props) {
    super(props)
    
    this.state = {
    }
    
    this.oauthURL = {
      facebook: '/OAuth/facebook/sample',
      twitter: '/OAuth/twitter/sample'
    }
    
    this.text = {
      facebookLabel: "Facebook",
      twitterLabel: "Twitter"
    }
    
  }
  
  render(){
    
    var {
      facebookLabel,
      twitterLabel
    } = this.text;
    
    var facebookOAuthURL = this.oauthURL.facebook;
    var twitterOAuthURL = this.oauthURL.twitter;
    
    return (
      <nav className="Component_RegistNav">
        <a href={facebookOAuthURL} className="RegistNav__button type_facebook">
          {facebookLabel}
        </a>
        <a href={twitterOAuthURL} className="RegistNav__button type_twitter">
          {twitterLabel}
        </a>
      </nav>
    );
  }
}