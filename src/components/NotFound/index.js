import './index.css'
import {withRouter, Link} from 'react-router-dom'

const NotFound = props => {
  const onGoToHome = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-con">
      <h1 className="lost-your-way">Lost Your Way ?</h1>
      <p className="not-found-para">
        we are sorry, the page you requested could not be found Please go back
        to the homepage.
      </p>
      <Link to="/">
        <button type="button" className="go-to-home">
          Go To Home
        </button>
      </Link>
    </div>
  )
}
export default withRouter(NotFound)
