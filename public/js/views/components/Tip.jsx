/**
  Tip Component
  
  - Tipボタンと額の選択
*/
var React   = require('react');
var Link    = require('react-router').Link;
var joinClasses = require('react/lib/joinClasses');

// Component Call
var {
} = require('../components');

export default class Tip extends React.Component {
  
  text: {
    buttonLabel: "TIP!"
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
    } = this.text;
    
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
        <button className="Tip__button">
          {buttonLabel}
        </button>
      </section>
    );
  }
}