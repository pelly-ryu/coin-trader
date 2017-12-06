import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app'

class NavigationBar extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <AppBar
        title="Coin Trader"
        iconElementRight={<IconButton><ActionExitToApp /></IconButton>}
      />
    )
  }
}

export default NavigationBar
