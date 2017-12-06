import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class BodyContainer extends Component {
  constructor (props) {
    super(props)

    this.handleSignUp = this.handleSignUp.bind(this)
  }

  handleSignUp() {
    this.props.onSignStatusChange('signedUp', true)
  }

  render () {
    if (!this.props.signedUp)
      return <SignUp submitPassword={this.handleSignUp}/>

    if (!this.props.signedIn)
      return <SignIn/>

    return (
      <div>
        you signed in
      </div>
    )
  }
}

class SignUp extends Component {
  constructor (props) {
    super(props)

    this.state = {
      password: '',
      repeat: '',
      errorText: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.submitPassword = this.submitPassword.bind(this)
  }

  handleChange (event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    }, () => {
      if (this.state.password === this.state.repeat) {
        this.setState({
          errorText: ''
        })
      } else {
        this.setState({
          errorText: 'Password does not match'
        })
      }
    })
  }

  submitPassword () {
    if (!this.state.password || this.state.errorText)
      return

    this.props.submitPassword()
    //save password
  }

  render () {
    const buttonStyle = {
      display: 'block'
    }

    return (
      <div>
        <TextField
          name="password"
          type="password"
          hintText="Set your password to start"
          onChange={this.handleChange}
        />
        <TextField
          name="repeat"
          type="password"
          hintText="Repeat your password"
          onChange={this.handleChange}
          errorText={this.state.errorText}
        />
        <RaisedButton
          label="Sign Up"
          disabled={Boolean(!this.state.password || this.state.errorText)}
          style={buttonStyle}
          onClick={this.submitPassword}
        />
      </div>
    )
  }
}

class SignIn extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        <TextField hintText="Input your password"/>
      </div>
    )
  }
}

export default BodyContainer
