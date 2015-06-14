/**
  Component: Pusher Modal
*/
var React   = require('react');
var Link    = require('react-router').Link;
var joinClasses = require('react/lib/joinClasses');

var PusherStore    = require('../../stores/PusherStore'),
    PusherActions  = require('../../actions/PusherActions')

// Component Call
var Modal = require('../components/Modal.jsx'),
    ThumbsBackgroundImage = require('../components/ThumbsBackgroundImage.jsx');

export default class Pusher extends React.Component {
  
  constructor(props) {
    super(props)
    
    /* Componentの呼び出しの際にStoreを初期化 */
    this.state = PusherStore.initState()
    //this.state = {}
    
    this.text = {
      thanks: 'Thanks!',
      doller: '$'
    }
    
  }
  
  /* Storeで更新があった際にStoreからstateを受け取ってsetStateするMethod */
  _setState(state) {
    console.log("_setState",state);
    this.setState(state);
  }
  
  /* LifeCycleでStoreを監視 */
  componentDidMount() {
    PusherStore.on('change:state', this._setState.bind(this));
  }
  componentWillUnMount() {
    PusherStore.removeListener('change:state', this._setState.bind(this));
  }
  
  /* PusherComponent側から閉じたい時に呼ぶ */
  onClose() {
    this.setState({
      show: false
    })
  }
  
  
  render(){
    
    var {
      thanks,
      doller
    } = this.text;
    
    var {
      userId,
      userName,
      userIcon,
      payValue
    } = this.state;
    console.log("this.state", this.state);
    return (
      <Modal toggle={this.state.show} display={this.state.show} className="Component_Pusher">
        <section className="Pusher__modal">
          <figure className="Puser__user">
            <ThumbsBackgroundImage imgPath={userIcon} />
            <figurecaption className="user__name">
              {userName}
            </figurecaption>
            <div className="user__payment">
              <span className="payment__prefix">
                {thanks}
              </span>
              <strong className="payment__value">
                {payValue}
              </strong>
              <em className="payment__doller">
                {doller}
              </em>
            </div>
          </figure>
        </section>
      </Modal>
    );
  }
}

Pusher.defaultProps = {
  userId: 0,
  userName: 'Pusher User Name',
  userIcon: '/images/sample/user-icon_audience.png',
  payValue: 1
};
