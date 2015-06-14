/**
  Page: Performer
*/
var React   = require('react');
var Link    = require('react-router').Link;
var joinClasses = require('react/lib/joinClasses');

var PusherActions  = require('../../actions/PusherActions');
var PerformerStore    = require('../../stores/PerformerStore');
var PageHistoryActions  = require('../../actions/PageHistoryActions');

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
    this.state = PerformerStore.getState()
    this.setupPusher()
  }

  render(){
    console.log(this.state)
    return (
      <div className="Page_Performer">
        <PerformerProfile performerId={this.props.params.performerId}
          performerName={this.state.performer_name}
          performerDescription={this.state.description}
          performerIconImage={this.state.performer_image_url} />
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

  /* Storeで更新があった際にStoreからstateを受け取ってsetStateするMethod */
  _setState(state) {
    console.log("_setState",state);
    this.setState(state);
  }

  componentDidMount() {
    PerformerStore.on('change:state', this._setState.bind(this));
    PageHistoryActions.onHistoryBack();
  }
  componentWillUnMount() {
    PerformerStore.removeListener('change:state', this._setState.bind(this));
  }
}
