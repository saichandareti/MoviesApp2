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

    return (
      <>
        <Header />
        <div className="account-section-bg-container">
          <h1 className="account-title">Account</h1>
          <hr className="ruler" />
          <div className="membership-container">
            <p className="account-description">Membership:</p>
            <div className="user-details-container">
              <p className="account-details">rahul@gmail.com</p>
              <p className="account-password">Password : ************</p>
            </div>
          </div>
          <hr className="ruler" />
          <div className="membership-container">
            <p className="account-description">Plan details:</p>
            <p className="account-details">Premium</p>{' '}
            <p className="ultra-text">Ultra HD</p>
          </div>
          <hr className="ruler" />
          <div className="button-container">
            <button
              className="Logout-button"
              type="button"
              onClick={this.OnLogout}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="account-footer">
          <ContactUs />
        </div>
      </>
    )
  }
}

export default Account
