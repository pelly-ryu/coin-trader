import React, { Component } from 'react'
import axios from 'axios'
import crypto from 'crypto-browserify'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import BodyContainer from './BodyContainer'
import NavigationBar from './NavigationBar'

injectTapEventPlugin() // It's too annoying

// It's better that one Component work with chrome storage

class CredentialForm extends Component {
  constructor (props) {
    super(props)

    const credentials = this.getCredentialsFromChromeStorage()

    this.state = {
      form: {
        accessToken: credentials.accessToken,
        secretKey: credentials.secretKey,
      },
      result: '',
    }
  }

  getCredentialsFromChromeStorage () {
    const credentials = {
      accessToken: '',
      secretKey: ''
    }

    if (!chrome || !chrome.storage) {
      return credentials
    }

    chrome.storage.local.get('credential', (data) => {
      if (data['credential']) {
        this.setState({form: data['credential']})
      }
    })

    return credentials
  }

  getBalance () {
    chrome.storage.local.set({
      credential: {
        accessToken: this.state.form.accessToken,
        secretKey: this.state.form.secretKey
      }
    })

    const url = 'https://api.coinone.co.kr/v2/account/balance/'
    let payload = {
      'access_token': this.state.form.accessToken,
      'nonce': Date.now()
    }

    payload = new Buffer(JSON.stringify(payload)).toString('base64')

    const signature = crypto
      .createHmac('sha512', this.state.form.secretKey.toUpperCase())
      .update(payload)
      .digest('hex')

    const headers = {
      'content-type': 'application/json',
      'X-COINONE-PAYLOAD': payload,
      'X-COINONE-SIGNATURE': signature
    }

    const axiosInstance = axios.create({
      baseURL: url,
      timeout: 10000,
      headers: headers
    })

    axiosInstance.post('')
      .then((response) => {
        this.setState({result: JSON.stringify(response.data)})
      })

  }

  onChange (event) {
    this.state.form[event.target.name] = event.target.value
    this.setState({form: this.state.form,})
  }

  onSubmit (event) {
    event.preventDefault()

    this.getBalance()
  }

  render () {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        Access Token <input type="text"
                            name="accessToken"
                            value={this.state.form['accessToken']}
                            onChange={this.onChange.bind(this)}/>
        <br/>
        Secret Key <input type="text"
                          name="secretKey"
                          value={this.state.form['secretKey']}
                          onChange={this.onChange.bind(this)}/>
        <br/>
        <input type="submit" value="load"/>
        <div>{this.state.result}</div>
      </form>
    )
  }
}

class App extends Component {
  constructor (props) {
    super(props)

    const signedUp = false
    const signedIn = false

    this.state = {
      signedUp: signedUp,
      signedIn: signedIn
    }

    this.handleSignStatusChange = this.handleSignStatusChange.bind(this)
  }

  handleSignStatusChange(key, value) {
    this.setState({
      [key]: value
    })
  }

  render () {
    const style = {
      height: '100%'
    } //todo i'm not sure this is needed.

    return (
      <div style={style}>
        <MuiThemeProvider>
          <div>
            <NavigationBar/>
            <BodyContainer
              signedUp={this.state.signedUp}
              signedIn={this.state.signedIn}
              onSignStatusChange={this.handleSignStatusChange}
            />
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default App
