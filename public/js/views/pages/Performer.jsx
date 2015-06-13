/**
  Page: Performer
*/
var React   = require('react');
var Link    = require('react-router').Link;
var joinClasses = require('react/lib/joinClasses');

var PusherActions  = require('../../actions/PusherActions');


// Component Call
var {
  PerformerProfile,
  Tip
} = require('../components');

// TODO: temp workaround
var _pusher = null,
    _channel = null;

export default class Perfomer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.setupPusher()
  }
  
  render(){
    return (
      <div className="Page_Performer">
        <PerformerProfile performerId={this.props.params.performerId}
          performerName={''}
          performerDescription={''}
          performerIconImage={''} />
        <Tip performerId={this.props.params.performerId} />
      </div>
    );
  }

  setupPusher(performerId) {    
    if(!_pusher){
      _pusher = new Pusher(PRELOAD_DATA.pusherClientId);
      _channel = _pusher.subscribe(this.props.params.performerId);
      _channel.bind('pay', function(data) {
        // alert("payed!: " + JSON.stringify(data));
        data.payValue = data.payValue || 1
        data.show = true
        PusherActions.setPusherData(data);
        // PusherActions.openPusherModal();
      });
    }
  }

  componentWillUnMount() {
    // unsubscribe all channels
    _channel && _channel.unbind();
  }
}