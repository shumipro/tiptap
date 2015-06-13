/**
  Component: Background Image for Thumbs
*/
  
// Requires
var React       = require('react');
var joinClasses = require('react/lib/joinClasses');


export default class ThumbsBackgroundImage extends React.Component {

  PropsType: {
    imagePath: React.PropTypes.string
  }

  render(){

    var {
      className,
      imagePath
    } = this.props;

    var style = (imagePath) ? {backgroundImage: 'url(' + imagePath + ')'} : {};

    return (
      <div
        className={joinClasses('Component_ThumbsBackgroundImage', className)}
        style={style}
      >
        {this.props.children}
      </div>
    );
  }
}


