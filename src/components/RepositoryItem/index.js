import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {avatarUrl, name, forksCount, issuesCount, starsCount} = repoDetails
  return (
    <li className="repoContainer">
      <div className="imageContainer">
        <img src={avatarUrl} alt={name} className="repoImage" />
        <h1 className="repoName">{name}</h1>
      </div>
      <div className="descriptionContainer">
        <div className="imageDescContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="descImages"
          />
          <p className="descNames">{starsCount} stars</p>
        </div>

        <div className="imageDescContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="descImages"
          />
          <p className="descNames">{forksCount} forks</p>
        </div>

        <div className="imageDescContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="descImages"
          />
          <p className="descNames">{issuesCount} open issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
