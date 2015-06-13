/**
  Page: Performer
*/
var React   = require('react');
var Link    = require('react-router').Link;
var joinClasses = require('react/lib/joinClasses');

// Component Call
var {
  PerformerProfile,
  Tip
} = require('../components');

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
    this._pusher = new Pusher(PRELOAD_DATA.pusherClientId);
    var channel = this._pusher.subscribe(this.props.params.performerId);
    // unsubscribe all channels
    channel.unbind();
    channel.bind('pay', function(data) {
      alert("payed!: " + data.amount);
      // TODO: use Pusher.jsx?

    });
  }
}