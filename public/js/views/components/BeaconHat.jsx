/**
  Component: BeaconHat
*/
var React   = require('react');
var Link    = require('react-router').Link;
var joinClasses = require('react/lib/joinClasses');

// Call Component
var ThumbsBackgroundImage = require('./ThumbsBackgroundImage.jsx');

export default class HistoryList extends React.Component {
  
  constructor(props) {
    super(props)
    
    this.state = {
      isWaiting:  true,
      imgPath: '/images/sample/performer-icon.png' 
    }
    
    this.text = {
      nearPerformerLabel: "Near Performer!"
    }
  }
  
  render(){
    
    var {
      nearPerformerLabel
    } = this.text;
    
    var {
      isWaiting,
      imgPath
    } = this.state;
    
    return (
      <section className="Component_BeaconHat">
        { isWaiting &&
          <i className="BeaconHat__waiting" />
        }
        { !isWaiting && isPerformer &&
          <figure className="BeaconHat__isPerformer">
            <figurecaption className="isPerformer__heading">
              {nearPerformerLabel}
            </figurecaption>
            <i className="BeaconHat__notification" />
            <ThumbsBackgroundImage imagePath={imgPath} />
          </figure>
        }
        <img src="/images/hat.svg" alt="Hat" />
      </section>
    );
  }
}