/**
  Page: Top
*/
var React   = require('react');
var Link    = require('react-router').Link;
var joinClasses = require('react/lib/joinClasses');
var request = require('superagent');
var dispatcher = require('../../dispatcher');
var ActionTypes = require('../../constants').ActionTypes;
var PerformerActions  = require('../../actions/PerformerActions');
var PerformerStore    = require('../../stores/PerformerStore');
var PageHistoryActions  = require('../../actions/PageHistoryActions');

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
    // temp
    if(!this._loaded && major_id && minor_id){
      request
        .get('/api/performer?major_id=' + major_id + '&minor_id=' + minor_id)
        .end((err, res) => {
          // {"performer_id":"","performer_name":"performer2","major_id":1,"minor_id":2, "performer_image_url": "", "description": ""}
          if(!err){
            PerformerActions.updatePerformer(res.body)
            this._loaded = true
          }
        })
    }
    
    return (
      <div className="Page_Top">
          <BeaconHat isPerformer={isPerformer} performerId={this.state.performer_id}/>
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

    /* Storeで更新があった際にStoreからstateを受け取ってsetStateするMethod */
  _setState(state) {
    console.log("_setState", state);
    this.setState(state);
  }

  componentDidMount() {
    PerformerStore.on('change:state', this._setState.bind(this));
    PageHistoryActions.offHistoryBack();
  }
  componentWillUnMount() {
    PerformerStore.removeListener('change:state', this._setState.bind(this));
  }

}