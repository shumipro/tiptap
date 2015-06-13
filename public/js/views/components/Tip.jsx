/**
  Tip Component
  
  - Tipボタンと額の選択
*/
var React   = require('react');
var Link    = require('react-router').Link;
var joinClasses = require('react/lib/joinClasses');
var request = require('superagent');
var PayCountActions  = require('../../actions/PayCountActions');

// Component Call
var {
} = require('../components');


// constants
var text = {
  buttonLabel: "TIP!"
}

export default class Tip extends React.Component {
  
  PropsType: {
    performerId: React.PropTypes.string
  }


  
  constructor(props) {
    super(props)
    this.state = {
      tips: [1,2,3] // Tip Dollers 1$, 2$, 3$...
    }
  }
  
  render(){
  
    var {
      buttonLabel
    } = text;
    
    var {
      tips
    } = this.state;
    
    
    var TipList = tips.map((tip, index)=> {
      return (
        <li key={index} className="list__item">
          {tip[index]}
        </li>
      );
    });
    
    return (
      <section className="Component_Tip">
        <ul className={joinClasses(
          "Tip__choce-list"
        )}>
          {TipList}
        </ul>
        <button className="Tip__button" onClick={this.execute.bind(this)}>
          {buttonLabel}
        </button>
      </section>
    );
  }

  execute() {
    var data = {
       "performer_id": this.props.performerId,
       "amount":"1.00",
       "currency":"USD"
    }
    request
      .post('/api/pusher_pay')
      .send(data)
      .set('Accept', 'application/json')
      .end(function(err, res){
        if(!err){
          PayCountActions.addPayCount();
        }
      })
  }
}