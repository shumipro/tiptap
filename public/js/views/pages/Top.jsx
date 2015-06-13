/**
  Page: Top
*/
var React   = require('react');
var Link    = require('react-router').Link;
var joinClasses = require('react/lib/joinClasses');

// Component Call
var {
  BeaconHat,
  Regist
} = require('../components');

export default class Top extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      isLogin: PRELOAD_DATA.isLogin
    }
    
    this.text = {
      heading: 'Regist'
    }
  }
  
  render(){
    
    var {
      isLogin
    } = this.state;
    
    var {
      heading
    } = this.text;
    
    return (
      <div className="Page_Top">
        <BeaconHat />
        { !isLogin &&
          <section className="TopRegist">
            <h1 className="TopRegist__heading">
              {heading}
            </h1>
            <Regist />
          </section>
        }
      </div>
    );
  }
}