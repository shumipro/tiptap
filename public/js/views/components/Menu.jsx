/**
  Component: Menu Modal
*/
var React   = require('react');
var Link    = require('react-router').Link;
var joinClasses = require('react/lib/joinClasses');

// Component Call
var {
} = require('../components');

export default class Menu extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
    }
    
    this.text = {
      performerEditLabel: 'パフォーマーになる',
      historyLabel: '履歴',
      aboutLabel: 'このアプリについて'
    }
  }
  
  render(){
    
    var {
      performerEditLabel,
      historyLabel,
      aboutLabel
    } = this.text;
    
    return (
      <aside className="Component_Menu">
        <nav className="Menu__nav">
          <ul className="nav__list">
            <li className="list__item">
              <Link to="PerformerEdit">
                {performerEditLabel}
              </Link>
            </li>
            <li className="list__item">
              <Link to="PayHistory">
                {historyLabel}
              </Link>
            </li>
            {/*
              <li className="list__item">
                <Link to="About">
                  {aboutLabel}
                </Link>
              </li>
            */}
          </ul>
        </nav>
      </aside>
    );
  }
}