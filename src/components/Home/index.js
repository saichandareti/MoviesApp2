import './index.css'

import {withRouter} from 'react-router-dom'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import ContactUs from '../ContactUs'
import TrendingNow from '../TrendingNow'
import Originals from '../Originals'
import HomePoster from '../HomePoster'

const Home = () => (
  <div className="home-container">
    <HomePoster />
    <h1 className="trending">Trending Now</h1>
    <TrendingNow />
    <h1 className="trending">Originals</h1>
    <Originals />
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

export default withRouter(Home)
