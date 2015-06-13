/**
  Component: Modal
*/
var React   = require('react');
var Link    = require('react-router').Link;
var joinClasses = require('react/lib/joinClasses');

// Component Call
var {
} = require('../components');

export default class Modal extends React.Component {
  
  constructor(props) {
    super(props)
    
    this.display = false;
    this.isTransitionStart = true;
    this.animateClass = 'modal-leave modal-leave-active';
    this.animateClasses = {
      enter : 'modal-enter modal-enter-active',
      leave : 'modal-leave modal-leave-active'
    }
    
    
    this.propsType = {
      toggle: React.PropTypes.bool
    }
    
    this.state = {
    }
  }
  
  componentDidMount() {
    var node = this.getDOMNode();
    node.addEventListener('transitionend', this.onTransitionEnd);
  }

  componentWillUnmount() {
    var node = this.getDOMNode();
    node.removeEventListener('transitionend', this.onTransitionEnd);
  }

  onTransitionEnd(e) {
    if (!this.props.toggle) {
      if (this.display) {
        this.display = false;
        this.isTransitionStart = true;
        this.forceUpdate();
      }
    }
  }
  
  onTransitonStart() {
     if (this.props.toggle) {
      if (this.display && this.isTransitionStart) {
        this.isTransitionStart = false;
        var delay = setTimeout(function(){
          this.animateClass = this.animateClasses.enter;
          this.forceUpdate();
        }.bind(this), 100); 
      }
    }else{
      this.animateClass = this.animateClasses.leave;
      this.isTransitionStart = true;
    }
  }
  
  render(){
    
    return (
      <div className={joinClasses('Component_modal', className, this.animateClass, this.display ? 'visible' : 'hide')}>
        <div className='layout_modal'>
          <div className="modal__backdrop" />
          <aside className="modal__frame scroll">
            <div className="modal__body">
              {this.props.children}
            </div>
          </aside>
        </div>
      </div>
    );
  }
}