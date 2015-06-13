/**
  Page: Top
*/
var React   = require('react');
var Link    = require('react-router').Link;
var joinClasses = require('react/lib/joinClasses');
var request = require('superagent');
var PayCountStore    = require('../../stores/PayCountStore');

// Component Call
var {
  BeaconHat,
  Regist,
  ThumbsBackgroundImage
} = require('../components');

export default class PayConfirm extends React.Component {
  constructor(props) {
    super(props)
    
    // convert from store
    this.state = this.convertDefaultState(PayCountStore.getState())
    
    this.text = {
      heading: 'PayPalでチップを支払いますか?',
      clearLabel: 'チップをクリア',
      payLabel: 'チップを支払う'
    }
  }

  /* Storeで更新があった際にStoreからstateを受け取ってsetStateするMethod */
  _setState(state) {
    this.setState(this.convertDefaultState(state));
  }

  convertDefaultState(state){
    if(state && state.tips){
      console.log("payconfirm")
      // [{amount: "1.00", currency: "USD", userIcon: "/images/sample/pusheeer.png", userId: "12345", userName: "ぷっしゃーー"}...]
      // TODO: temp to handle multi performer
      // convert tips to performerList
      var data = {};
      state.tips.map((tip, key)=>{
        data = {
          performerId: tip.userId,
          performerName: tip.userName,
          performerIconImage: tip.userIcon,
        }
      });
      // set total tip count
      data.performerPayValue = state.tips.length;
      return {performerList: [data]};
    }
    return {performerList: []};
  }
  
  /* LifeCycleでStoreを監視 */
  componentDidMount() {
    PayCountStore.on('change:state', this._setState.bind(this));
  }

  componentWillUnMount() {
    PayCountStore.removeListener('change:state', this._setState.bind(this));
  }
  
  getPerformerList() {
    var doller = '$';
    var {
      performerList 
    } = this.state;
    return performerList.map( (performer, key) =>{
      var {
        performerId,
        performerName,
        performerIconImage,
        performerDescription,
        performerPayValue
      } = performer;
      
      return (
        <li key={key} className="list__item">
          <figure className="item__user">
            <ThumbsBackgroundImage imgPath={performerIconImage} />
            <div className="user__information">
              <figurecaption className="user__name">
                {performerName}
              </figurecaption>
              <div className="user__payment">
                <strong className="payment__value">
                  {performerPayValue}
                </strong>
                <em className="payment__doller">
                  {doller}
                </em>
              </div>
            </div>
          </figure>
        </li>
      );
    });
  }
  
  onClear() {
    alert('支払い予定をクリアーしようぜ');
  }
  
  onPay() {
    
    // create payment data
    var data = {
      total: "",
      payments: []
    };
    var totalPayValue = 0;

    this.state.performerList.map((performer, key) => {
      var {
        performerId,
        performerName,
        performerIconImage,
        performerDescription,
        performerPayValue
      } = performer;

      data.payments.push({
         "performer_id": performerId,
         "amount": performerPayValue + ".00",
         "currency": "USD"
      });
      totalPayValue += performerPayValue;
    });
    data.total = totalPayValue + ".00"

    // send post
    request
      .post('/api/payment/create')
      .send(data)
      .set('Accept', 'application/json')
      .end(function(err, res){
        var redirect = res && res.body && res.body.approvalURL
        if(redirect){
          location.href = "tiptap://" + redirect
        }
      })
  }
  
  render(){
    var {} = this.state;
    
    var {
      heading,
      clearLabel,
      payLabel
    } = this.text;
    
    return (
      <div className="Page_PayConfirm">
        <section className="PayPerformer">
          <h1 className="PayPerformer__heading">
            {heading}
          </h1>
          <ul className="PayPerformer__list">
            {this.getPerformerList()}
          </ul>
          
          <div className="PayPerformer__function">
            <button className="function__clear" onClick={this.onClear}>
              {clearLabel}
            </button>
            <button className="function__pay" onClick={this.onPay.bind(this)}>
              {payLabel}
            </button>
          </div>
        </section>
      </div>
    );
  }
}

// get API to Props
// PayConfirm.defaultProps = {
//   performerList: [
//     {
//       performerId: "0",
//       performerName: 'ピエーロ瀧',
//       performerDescription: 'ジャグリングやってます。30年近くも。どうしようもないですね。',
//       performerIconImage: '/images/sample/user-icon_performer.png',
//       performerPayValue: 1
//     },
//     {
//       performerId: "1",
//       performerName: 'チェロ弾き',
//       performerDescription: 'チェロ弾いてます。100年近くも。まだがんばる！',
//       performerIconImage: '/images/sample/user-icon_performer.png',
//       performerPayValue: 15
//     },
//     {
//       performerId: "2",
//       performerName: 'わーいわいわいわい',
//       performerDescription: 'わーい',
//       performerIconImage: '/images/sample/user-icon_performer.png',
//       performerPayValue: 3
//     }
//   ]
// };
