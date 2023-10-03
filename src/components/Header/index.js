import './index.css'
import {HiOutlineSearch} from 'react-icons/hi'
import {Link, withRouter} from 'react-router-dom'

const Header = () => (
  <ul className="header-container">
    <Link to="/" className="link-element">
      <img
        src="https://res.cloudinary.com/dgwqllbxi/image/upload/v1695201554/Group_7399_tj78al.png"
        alt="website logo"
        className="movies"
      />
    </Link>
    <Link to="/" className="link-element">
      <li className="home-para">Home</li>
    </Link>
    <Link to="/popular" className="link-element">
      <li className="popular-para">Popular</li>
    </Link>

    <button type="button" testid="searchButton" className="search-button">
      <Link to="/search" className="link-element">
        <HiOutlineSearch className="search-icon" />
      </Link>
    </button>

    <Link to="/account" className="link-element">
      <img
        src="https://res.cloudinary.com/dgwqllbxi/image/upload/v1695374031/Mask_Group_zdn2jk.png"
        alt="profile"
        className="avatar"
      />
    </Link>
    <Link to="/account" className="link-element">
      <img
        src="https://res.cloudinary.com/dgwqllbxi/image/upload/v1695886764/add-to-queue_1_zbdmlt.png"
        alt="profile"
        className="add-to-que"
      />
    </Link>
  </ul>
)

export default withRouter(Header)
