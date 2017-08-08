import React, { Component } from 'react'

class CredentialForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      form: {
        accessToken: 'default',
        secretKey: '',
      }
    }
  }

  // getBalance () {
  //   const crypto = require('crypto')
  //   const request = require('request')
  //   const ACCESS_TOKEN = ''
  //   const SECRET_KEY = ''
  //   const url = 'https://api.coinone.co.kr/v2/account/balance/'
  //   let payload = {
  //     'access_token': ACCESS_TOKEN,
  //     'nonce': Date.now()
  //   }
  //
  //   payload = new Buffer(JSON.stringify(payload)).toString('base64')
  //
  //   const signature = crypto
  //     .createHmac('sha512', SECRET_KEY.toUpperCase())
  //     .update(payload)
  //     .digest('hex')
  //
  //   const headers = {
  //     'content-type': 'application/json',
  //     'X-COINONE-PAYLOAD': payload,
  //     'X-COINONE-SIGNATURE': signature
  //   }
  //
  //   const options = {
  //     url: url,
  //     headers: headers,
  //     body: payload
  //   }
  //
  //   request.post(options,
  //     function (error, response, body) {
  //       console.log(body)
  //     })
  // }

  onChange (event) {
    this.state.form[event.target.name] = event.target.value
    this.setState({form: this.state.form})
  }

  onSubmit (event) {
    event.preventDefault()

    //this.getBalance()
  }

  render () {
    return (
      <form onSubmit={this.onSubmit}>
        Access Token <input type="text" name="accessToken" onChange={this.onChange.bind(this)}/><br/>
        Secret Key <input type="text" name="secretKey" onChange={this.onChange.bind(this)}/><br/>
        <input type="submit" value="load"/>
        <br/><br/>your input : {this.state.form.accessToken}
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
