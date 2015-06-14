/**
  Component: Modal
*/
var React   = require('react');
var joinClasses = require('react/lib/joinClasses');

export default class Modal extends React.Component {
  
  constructor(props) {
    super(props)
    
    this.props.display = false;
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
    var node = React.findDOMNode(this);
    node.addEventListener('transitionstart', this.onTransitionStart.bind(this));
    this.refs.Modal.getDOMNode().addEventListener('click', this.hide.bind(this));
  }

  componentWillUnmount() {
    var node = React.findDOMNode(this);
    node.removeEventListener('transitionend', this.onTransitionEnd.bind(this));
    this.refs.Modal.getDOMNode().removeEventListener('click', this.hide.bind(this));
  }

  onTransitionEnd(e) {
    if (!this.props.toggle) {
      if (this.props.display) {
        this.props.display = false;
        this.isTransitionStart = true;
        this.forceUpdate();
      }
    }
  }
  
  onTransitionStart() {
     if (this.props.toggle) {
      // if (this.props.display && this.isTransitionStart) {
      if (this.props.display && this.isTransitionStart) {
        this.isTransitionStart = false;
        var delay = setTimeout(function(){
          this.animateClass = this.animateClasses.enter;
          this.forceUpdate();
          // close
        }.bind(this), 100);
      }
    }else{
      this.animateClass = this.animateClasses.leave;
      this.isTransitionStart = true;
    }
  }

  hide(e) {
    // this.animateClass = this.animateClasses.leave;
    this.props.toggle = this.props.display = false;
    this.forceUpdate();
    this.refs.Modal.getDOMNode().removeEventListener('click', this.hide.bind(this));
  }
  
  render(){
    
    var {
      className
    } = this.props;
    
    if(this.props.display) {
      this.onTransitionStart()
    }

    return (
      <div ref="Modal" className={joinClasses('Component_modal', className, this.animateClass, this.props.display ? 'visible' : 'hide')}>
        <div className='layout_modal'>
          <div className="modal__backdrop" />
          <aside className="modal__frame scroll">
            <div ref="Modal" className="modal__body">
              {this.props.children}
            </div>
          </aside>
        </div>
      </div>
    );
  }
}