/**
  Page: Top
*/
var React   = require('react');
var Link    = require('react-router').Link;
var joinClasses = require('react/lib/joinClasses');

// Component Call
var {
  BeaconHat,
  Regist
} = require('../components');

export default class PayConfirm extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {}
    
    this.text = {
      heading: 'PayPalでチップを支払いますか?'
    }
  }
  
  render(){
  
    var {} = this.state;
    
    var {
      heading
    } = this.text;
    
    return (
      <div className="Page_PayConfirm">
        <section className="PayPerformer">
          <h1 className="PayPerformer__heading">
            {heading}
          </h1>
          {/* ul.PayPerformer__list */}
          <div>PayConfirm Performer List</div>
          {/* buttons.PayPerformer__function */}
          <div>Buttons[cancel/ok->paypal]</div>
        </section>
      </div>
    );
  }
}