/**
  Page: Top
*/
var React   = require('react');
var Link    = require('react-router').Link;
var joinClasses = require('react/lib/joinClasses');
var request = require('superagent');
var dispatcher = require('../../dispatcher');
var ActionTypes = require('../../constants').ActionTypes;

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

    var {
      major_id,
      minor_id,
      isPerformer
    } = this.props.query

    // <Link to="{'/performer/' + store.perfomerId}">
    if(major_id && minor_id){
      request
        .get('/api/performer?major_id=' + major_id + '&minor_id=' + minor_id)
        .end((err, res) => {
          // {"performer_id":"","performer_name":"performer2","major_id":1,"minor_id":2}
          // dispatcher.handleViewAction({type: ActionTypes.UPDATE_PERFORMER, performer: res });
        })
    }
    
    return (
      <div className="Page_Top">
          <BeaconHat isPerformer={isPerformer}/>
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