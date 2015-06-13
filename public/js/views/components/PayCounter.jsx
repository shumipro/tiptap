/**
  Component: Pay Counter
*/
var React   = require('react');
var Link    = require('react-router').Link;
var joinClasses = require('react/lib/joinClasses');
var PayCountStore    = require('../../stores/PayCountStore');

// Component Call
var {
} = require('../components');

export default class PayCounter extends React.Component {
  
  constructor(props) {
    super(props)
    
    this.state = {
      count: 0
    }
    
    this.text = {
      payButtonLabel: 'Pay'
    }
    
  }

  /* Storeで更新があった際にStoreからstateを受け取ってsetStateするMethod */
  _setState(state) {
    // increment count
    if(state && state.tips){
      this.setState({count: state.tips.length});
    }
  }
  
  /* LifeCycleでStoreを監視 */
  componentDidMount() {
    PayCountStore.on('change:state', this._setState.bind(this));
  }
  componentWillUnMount() {
    PayCountStore.removeListener('change:state', this._setState.bind(this));
  }
  
  render(){
    
    var {
      payButtonLabel
    } = this.text;
    
    var {
      count
    } = this.state;
    
    return (
      <div className="Component_PayCount">
        { count > 0 && 
          <Link to="/payconfirm/">
            <button className="PayCounte__button">
              {payButtonLabel}
            </button>
            <i className="PayCounte__counter">
              {count}
            </i>
          </Link>
        }
      </div>
    );
  }
}