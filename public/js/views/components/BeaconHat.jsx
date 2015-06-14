/**
  Component: BeaconHat
*/
var React   = require('react');
var Link    = require('react-router').Link;
var joinClasses = require('react/lib/joinClasses');

// Call Component
var ThumbsBackgroundImage = require('./ThumbsBackgroundImage.jsx');

export default class BeaconHat extends React.Component {
  
  constructor(props) {
    super(props)
    
    this.state = {
      imgPath: '/images/sample/performer-icon.png' 
    }
    
    this.text = {
      defaultLabel: "Find Street Performer...",
      nearPerformerLabel: "Near Performer!"
    }
  }
  
  render(){
    
    var {
      nearPerformerLabel,
      defaultLabel
    } = this.text;
    
    var {
      imgPath
    } = this.state;

    var {
      isPerformer,
      performerId
    } = this.props;
    
    return (
      <section className="Component_BeaconHat">
        { !isPerformer &&
          <figure className="BeaconHat__noPerformer">
            <i className="BeaconHat__waiting" />
            <figurecaption className="isPerformer__heading">
              {defaultLabel}
            </figurecaption>
          </figure>
        }
        { isPerformer && performerId && 
          <Link to={'/performer/' + this.props.performerId}>
          <figure className="BeaconHat__isPerformer">
            <i className="BeaconHat__notification" />
            <ThumbsBackgroundImage imagePath={imgPath} />
            <figurecaption className="BeaconHat__heading">
              {nearPerformerLabel}
            </figurecaption>
          </figure>
          </Link>
        }
        <img className="BeaconHat__hat" src="/images/hat.svg" alt="Hat" />
      </section>
    );
  }
}