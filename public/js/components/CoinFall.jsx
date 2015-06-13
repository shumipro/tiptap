import React from 'react'
import ReactStateAnimation from 'react-state-animation'

export default class CoinFall extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.y = 0
        this.x = Math.floor(Math.random() * 800)
        // react state animation wrapper
        this._animate = new ReactStateAnimation(this)
        this.start()
    }

    start() {
        // start animation
        this._animate.easeInCubic('y', 450/*end value*/, 1000/*duration(ms)*/).then(() => {
            alert('Thanks, ' + this.props.name)
        })
    }

    stop() {
        this._animate.stop()
    }

    getStyle() {
        return {
            position: 'absolute',
            backgroundColor: "#009688",
            top: this.y + "px",
            left: this.x + "px",
            width: this.props.width,
            height: this.props.height
        }
    }

    render() {
        return (
            <div style={this.getStyle()}></div>
        )
    }
}

CoinFall.defaultProps = {
    width: 50,
    height: 50,
    name: '',
    email: ''
}