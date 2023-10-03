import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginPage extends Component {
  state = {
    nameInput: '',
    passwordInput: '',
    showError: false,
    errorMsg: '',
  }

  OnChangeNameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  OnChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  OnSubmitSuccess = jwtToken => {
    this.setState({nameInput: '', passwordInput: ''})
    Cookies.set('jwt_token', jwtToken, {expires: 30})

    console.log(jwtToken)
    const {history} = this.props
    history.replace('/')
  }

  OnSubmitFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  LoginCreds = async event => {
    event.preventDefault()

    const {nameInput, passwordInput} = this.state

    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username: nameInput, password: passwordInput}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const jsonData = await response.json()

    if (response.ok === true) {
      Cookies.set('username', nameInput, {expires: 30})
      Cookies.set('password', passwordInput, {expires: 30})
      this.OnSubmitSuccess(jsonData.jwt_token)
    } else if (response.ok !== true) {
      this.OnSubmitFailure(jsonData.error_msg)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {showError, errorMsg} = this.state
    const display = showError ? (
      <p className="error-msg">{errorMsg}</p>
    ) : (
      <p className="error-msg"> </p>
    )
    return (
      <div className="login-bg-container">
        <img
          src="https://res.cloudinary.com/dgwqllbxi/image/upload/v1695201554/Group_7399_tj78al.png"
          alt="login website logo"
          className="movies-image"
        />
        <form className="login-container" onSubmit={this.LoginCreds}>
          <h1 className="login-heading">Login</h1>
          <div className="name-input-con">
            <label htmlFor="name-input" className="username">
              USERNAME
            </label>
            <input
              type="text"
              id="name-input"
              className="name-input"
              onChange={this.OnChangeNameInput}
            />
          </div>
          <div className="password-input-con">
            <label htmlFor="password-input" className="username">
              PASSWORD
            </label>
            <input
              type="password"
              id="password-input"
              className="name-input"
              onChange={this.OnChangePasswordInput}
            />
          </div>
          {display}
          <button
            type="submit"
            className="login-button"
            onClick={this.LoginCreds}
          >
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default LoginPage
