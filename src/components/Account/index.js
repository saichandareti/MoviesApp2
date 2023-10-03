import './index.css'
import {Component} from 'react'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import Cookies from 'js-cookie'
import Header from '../Header'
import ContactUs from '../ContactUs'

class Account extends Component {
  OnLogout = () => {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      const {history} = this.props
      Cookies.remove('jwt_token')
      Cookies.remove('username')
      Cookies.remove('password')
      history.replace('/login')
    }
  }

  render() {
    const userName = Cookies.get('username')
    const passWord = Cookies.get('password')
    const passwordList = passWord.split('')
    const hashed = passwordList.map(each => '*')

    console.log(hashed)
    return (
      <div className="account-con">
        <Header />
        <div className="account-container">
          <h1 className="account-heading">Account</h1>
          <hr className="rule" />
          <div className="member-ship">
            <p className="member-heading">Member ship</p>
            <div className="gmail-password">
              <h1 className="gmail-heading">{userName}</h1>
              <p className="password-heading">Password : {hashed}</p>
            </div>
          </div>
          <hr className="rule" />
          <div className="member-ship">
            <p className="member-heading">Plan details</p>
            <p className="premium">Premium</p>
            <p className="ultra-hd">Ultra HD</p>
          </div>
          <hr className="rule" />
          <button
            type="button"
            className="logout-button"
            onClick={this.OnLogout}
          >
            Logout
          </button>
        </div>

        <>
          <div className="contact-con">
            <FaGoogle className="google-icon" />
            <FaTwitter className="google-icon icon-margin" />
            <FaInstagram className="google-icon icon-margin" />
            <FaYoutube className="google-icon icon-margin" />
          </div>
          <p className="contact-us">Contact us</p>
        </>
      </div>
    )
  }
}

export default Account
