/**
  Page: Top
*/
var React   = require('react');
var Link    = require('react-router').Link;
var joinClasses = require('react/lib/joinClasses');

// Component Call
var {
  BeaconHat,
  Regist,
  ThumbsBackgroundImage
} = require('../components');

export default class PayConfirm extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {}
    
    this.text = {
      heading: 'PayPalでチップを支払いますか?',
      clearLabel: 'チップをクリア',
      payLabel: 'チップを支払う'
    }
  }
  
  getPerformerList() {
    var doller = '$';
    var {
      performerList 
    } = this.props;
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
    alert('支払おうぜ');
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
            <button className="function__pay" onClick={this.onPay}>
              {payLabel}
            </button>
          </div>
        </section>
      </div>
    );
  }
}

// get API to Props
PayConfirm.defaultProps = {
  performerList: [
    {
      performerId: 0,
      performerName: 'ピエーロ瀧',
      performerDescription: 'ジャグリングやってます。30年近くも。どうしようもないですね。',
      performerIconImage: '/images/sample/user-icon_performer.png',
      performerPayValue: 1
    },
    {
      performerId: 1,
      performerName: 'チェロ弾き',
      performerDescription: 'チェロ弾いてます。100年近くも。まだがんばる！',
      performerIconImage: '/images/sample/user-icon_performer.png',
      performerPayValue: 15
    },
    {
      performerId: 2,
      performerName: 'わーいわいわいわい',
      performerDescription: 'わーい',
      performerIconImage: '/images/sample/user-icon_performer.png',
      performerPayValue: 3
    }
  ]
};