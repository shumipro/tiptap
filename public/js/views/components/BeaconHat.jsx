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
      nearPerformerLabel: "Near Performer!"
    }
  }
  
  render(){
    
    var {
      nearPerformerLabel
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
          <i className="BeaconHat__waiting" />
        }
        { isPerformer && performerId && 
          <Link to={'/performer/' + this.props.performerId}>
          <figure className="BeaconHat__isPerformer">
            <figurecaption className="isPerformer__heading">
              {nearPerformerLabel}
            </figurecaption>
            <i className="BeaconHat__notification" />
            <ThumbsBackgroundImage imagePath={imgPath} />
          </figure>
          </Link>
        }
        <img src="/images/hat.svg" alt="Hat" />
      </section>
    );
  }
}