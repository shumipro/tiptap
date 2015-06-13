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

//テスト用に写真置いてる
    return (
      <div
        className={joinClasses('Component_ThumbsBackgroundImage', className)}
        style={style}
      >
        {this.props.children}
        <img src={'../../images/teji-ma.jpg'} width="80"/>
      </div>
    );
  }
}
