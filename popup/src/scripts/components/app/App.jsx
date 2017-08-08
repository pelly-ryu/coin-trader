import React, { Component } from 'react'
import axios from 'axios'
import crypto from 'crypto-browserify'

class CredentialForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      form: {
        accessToken: '',
        secretKey: '',
      },
      result: '',
    }
  }

  getBalance () {
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
        Access Token <input type="text" name="accessToken" onChange={this.onChange.bind(this)}/><br/>
        Secret Key <input type="text" name="secretKey" onChange={this.onChange.bind(this)}/><br/>
        <input type="submit" value="load"/>
        <div>{this.state.result}</div>
      </form>
    )
  }
}

class App extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        <CredentialForm/>
      </div>
    )
  }
}

export default App
