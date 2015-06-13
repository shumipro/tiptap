import React from 'react'
import request from 'superagent'
import CoinFall from './CoinFall'

export default class CoinFallCtrl extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            coins: []
        }
        // start polling
        this.start()
    }

    start() {
        this.fetch()
    }

    fetch() {
        request
        .get('./api/payment/list')
        .end((err, res) => {
            // check the 
            // if(this._count < res.count) {
                var item = {
                    sender: {
                        name: "kyokomi",
                        email: "xxxx@email.com"
                    }
                }
                this.coinFall(item)
            // }
            setTimeout(() => {
                this.fetch()
            }, this.props.interval)
        })
    }

    coinFall(item) {
        var coins = this.state.coins
        this.setState({coins: coins.concat({
            id: coins.length,
            name: item.sender.name,
            email: item.sender.email
        })})
    }

    render() {
        return (
            <div>
                {this.state.coins.map(
                    (coin) => <CoinFall ref={coin.id} key={coin.id} name={coin.name} email={coin.email} />
                )}
            </div>
        )
    }
}

CoinFallCtrl.defaultProps = {
    interval: 5000
}