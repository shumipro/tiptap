import React from 'react'
import CoinFallCrl from './components/CoinFallCtrl'

var coinFallCtrlNode = document.getElementById('coinFallCtrl')
coinFallCtrlNode && React.render(<CoinFallCrl />, coinFallCtrlNode)