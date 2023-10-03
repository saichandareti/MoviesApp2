import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'

const trendingApiConstants = {
  onSuccess: 'SUCCESS',
  onFailure: 'FAILED',
  inProgress: 'IN_PROGRESS',
  initial: 'INTIAL',
}

class HomePoster extends Component {
  state = {
    poster: [],
    isTrendingSuccess: trendingApiConstants.initial,
  }

  componentDidMount() {
    this.GetTrendingMovies()
  }

  GetTrendingMovies = async () => {
    this.setState({isTrendingSuccess: trendingApiConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const details = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      'https://apis.ccbp.in/movies-app/originals',
      details,
    )
    const jsonData = await response.json()

    if (response.ok === true) {
      const updatedData = jsonData.results.map(each => ({
        id: each.id,
        backdropPath: each.backdrop_path,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))

      const randomPosterDetails =
        updatedData[Math.ceil(Math.random() * updatedData.length - 1)]
      this.setState({
        poster: randomPosterDetails,
        isTrendingSuccess: trendingApiConstants.onSuccess,
      })
    } else if (response.ok !== true) {
      this.setState({isTrendingSuccess: trendingApiConstants.onFailure})
    }
  }

  renderTrendingMovies = () => {
    const {isTrendingSuccess, poster} = this.state
    const {backdropPath, overview, title} = poster
    const settings = {
      dots: false,
      slidesToShow: 5,
      slidesToScroll: 1,
    }

    switch (isTrendingSuccess) {
      case trendingApiConstants.onSuccess:
        return (
          <div
            className="spider-man-con"
            style={{backgroundImage: `url(${backdropPath})`}}
          >
            <Header />
            <h1 className="super-man-title">{title}</h1>
            <p className="super-man-para">{overview}</p>
            <button type="button" className="super-play-button">
              Play
            </button>
          </div>
        )
      case trendingApiConstants.onFailure:
        return (
          <div>
            <Header />
            <div className="home-poster-failure">
              <img
                src="https://res.cloudinary.com/dgwqllbxi/image/upload/v1695825829/alert-triangle_ksyewu.png"
                alt="alert"
                className="x-alert"
              />
              <p className="originals-para">
                Something went wrong. Please try again
              </p>
              <button
                type="button"
                className="try-again-originals"
                onClick={this.GetTrendingMovies}
              >
                Try Again
              </button>
            </div>
          </div>
        )
      case trendingApiConstants.inProgress:
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
    return this.renderTrendingMovies()
  }
}
export default HomePoster
