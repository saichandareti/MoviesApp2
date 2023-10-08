import './index.css'
import {Component} from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'

const apiConstants = {
  onSuccess: 'SUCCESS',
  onFailure: 'FAILED',
  inProgress: 'IN_PROGRESS',
  initial: 'INTIAL',
}

class Popular extends Component {
  state = {isSuccess: apiConstants.initial, popularData: []}

  componentDidMount() {
    this.GetPopularMovies()
  }

  GetPopularMovies = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({isSuccess: apiConstants.inProgress})
    const details = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      'https://apis.ccbp.in/movies-app/popular-movies',
      details,
    )
    const jsonData = await response.json()
    if (response.ok === true) {
      const updatedData = jsonData.results.map(each => ({
        id: each.id,
        backdropPath: each.backdrop_path,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({
        popularData: updatedData,
        isSuccess: apiConstants.onSuccess,
      })
    } else if (response.ok !== true) {
      this.setState({isSuccess: apiConstants.onFailure})
    }
  }

  onFailure = () => (
    <div className="search-failure">
      <img
        src="https://res.cloudinary.com/dgwqllbxi/image/upload/v1695818080/Background-Complete_o749xy.png"
        alt="failure view"
        className="something-went-wrong"
      />
      <p className="something-went-para">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="try-again-button"
        onClick={this.GetPopularMovies}
      >
        Try Again
      </button>
    </div>
  )

  renderMovies = () => {
    const {isSuccess, popularData} = this.state

    switch (isSuccess) {
      case apiConstants.onSuccess:
        return (
          <>
            <ul className="popular-list">
              {popularData.map(every => (
                <li className="popular-item" key={every.id}>
                  <Link to={`/movies/${every.id}`} key={every.id}>
                    <img
                      src={every.posterPath}
                      alt={every.title}
                      key={every.id}
                      className="popular-movie"
                    />
                  </Link>
                </li>
              ))}
            </ul>
            <>
              <div className="contact-con">
                <FaGoogle className="google-icon" />
                <FaTwitter className="google-icon icon-margin" />
                <FaInstagram className="google-icon icon-margin" />
                <FaYoutube className="google-icon icon-margin" />
              </div>
              <p className="contact-us">Contact us</p>
            </>
          </>
        )
      case apiConstants.onFailure:
        return this.onFailure()
      case apiConstants.inProgress:
        return (
          <div className="loader-container load-con" testid="loader">
            <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
          </div>
        )

      default:
        return null
    }
  }

  render() {
    return (
      <div className="popular-movies-con">
        <Header />
        <ul className="popular-options">
          <Link to="/" className="link-element">
            <li className="popular-home pop-home">Home</li>
          </Link>
          <Link to="/popular" className="link-element">
            <li className="popular-home">Popular</li>
          </Link>
          <Link to="/popular" className="link-element">
            <li className="popular-home pop-account">Account</li>
          </Link>
          <Link to="/popular" className="link-element">
            <AiOutlineClose className="close-icon" />
          </Link>
        </ul>
        {this.renderMovies()}
      </div>
    )
  }
}

export default Popular
