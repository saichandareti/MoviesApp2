import './index.css'
import {Link} from 'react-router-dom'
import {Component} from 'react'
import {HiOutlineSearch} from 'react-icons/hi'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'

const apiConstants = {
  onSuccess: 'SUCCESS',
  onFailure: 'FAILED',
  inProgress: 'IN_PROGRESS',
  initial: 'INTIAL',
}

class SearchMovies extends Component {
  state = {isSuccess: apiConstants.initial, searchInput: '', moviesData: []}

  GetInput = event => {
    this.setState({searchInput: event.target.value})
  }

  GetSearchedMovies = async () => {
    this.setState({isSuccess: apiConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput} = this.state
    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const jsonData = await response.json()
    const resuArray = jsonData.results

    if (response.ok === true) {
      const updatedData = resuArray.map(each => ({
        id: each.id,
        title: each.title,
        posterPath: each.poster_path,
        backdropPath: each.backdrop_path,
      }))
      this.setState({
        moviesData: updatedData,
        isSuccess: apiConstants.onSuccess,
      })
    } else if (response.ok !== true) {
      this.setState({isSuccess: apiConstants.onFailure})
    }
  }

  NoResults = () => {
    const {searchInput} = this.state
    return (
      <div className="no-res-con">
        <img
          src="https://res.cloudinary.com/dgwqllbxi/image/upload/v1695670878/nores_hoeqa4.png"
          alt="no movies"
          className="no-res-image"
        />
        <p className="no-results-para">
          Your search for {searchInput} did not find any matches.
        </p>
      </div>
    )
  }

  onFailure = () => (
    <div className="search-failure">
      <img
        src="https://res.cloudinary.com/dgwqllbxi/image/upload/v1695818080/Background-Complete_o749xy.png"
        alt="failure view"
        className="something-went-wrong"
      />
      <h1 className="something-went-para">
        Something went wrong. Please try again
      </h1>
      <button
        type="button"
        className="try-again-button"
        onClick={this.GetSearchedMovies}
      >
        Try Again
      </button>
    </div>
  )

  renderMovies = () => {
    const {isSuccess, moviesData} = this.state
    let checkData
    if (moviesData.length === 0) {
      checkData = this.NoResults()
    } else {
      checkData = (
        <ul className="popular-list">
          {moviesData.map(every => (
            <Link to={`/movies/${every.id}`} key={every.id}>
              <li className="popular-item" key={every.id}>
                <img
                  src={every.posterPath}
                  alt={every.title}
                  key={every.id}
                  className="popular-movie"
                />
              </li>
            </Link>
          ))}
        </ul>
      )
    }
    switch (isSuccess) {
      case apiConstants.onSuccess:
        return checkData
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
      <div className="search-container">
        <ul className="header-container">
          <Link to="/" className="link-element">
            <img
              src="https://res.cloudinary.com/dgwqllbxi/image/upload/v1695201554/Group_7399_tj78al.png"
              alt="movies"
              className="movies"
            />
          </Link>
          <Link to="/" className="link-element">
            <li className="home-para">Home</li>
          </Link>
          <Link to="/popular" className="link-element">
            <li className="popular-para">Popular</li>
          </Link>

          <div className="search-inp-con">
            <input
              type="search"
              className="search-element"
              onChange={this.GetInput}
            />
            <button
              type="button"
              onClick={this.GetSearchedMovies}
              className="search-button-5"
              testid="searchButton"
            >
              <HiOutlineSearch className="search-icon-2" />
            </button>
          </div>
          <Link to="/account" className="link-element">
            <img
              src="https://res.cloudinary.com/dgwqllbxi/image/upload/v1695374031/Mask_Group_zdn2jk.png"
              alt="avatar"
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

        {this.renderMovies()}
      </div>
    )
  }
}
export default SearchMovies
