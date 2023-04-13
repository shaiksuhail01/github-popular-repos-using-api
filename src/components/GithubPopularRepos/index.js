import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    activeLanguageButton: languageFiltersData[0].id,
    activeRepos: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getPopularRepos()
  }

  getPopularRepos = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {activeLanguageButton} = this.state

    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageButton}`

    const response = await fetch(apiUrl)

    if (response.ok) {
      const fetchedData = await response.json()
      const popularRepos = fetchedData.popular_repos
      const updatedData = popularRepos.map(eachRepo => ({
        avatarUrl: eachRepo.avatar_url,
        forksCount: eachRepo.forks_count,
        id: eachRepo.id,
        issuesCount: eachRepo.issues_count,
        name: eachRepo.name,
        starsCount: eachRepo.stars_count,
      }))
      this.setState({
        activeRepos: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickLanguageItem = activeLanguageButton => {
    this.setState({activeLanguageButton}, this.getPopularRepos)
  }

  renderRepoItems = () => {
    const {activeRepos} = this.state
    return (
      <ul className="repoListContainer">
        {activeRepos.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} repoDetails={eachRepo} />
        ))}
      </ul>
    )
  }

  renderLoder = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailure = () => (
    <div className="failureContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failureImage"
      />
      <h1 className="failureMsg">Something Went Wrong</h1>
    </div>
  )

  renderSwitch = param => {
    switch (param) {
      case apiStatusConstants.success:
        return this.renderRepoItems()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoder()

      default:
        return null
    }
  }

  renderLanguageList = () => {
    const {activeLanguageButton} = this.state
    return (
      <ul className="languageListContainer">
        {languageFiltersData.map(eachItem => (
          <LanguageFilterItem
            key={eachItem.id}
            languageDetails={eachItem}
            isActive={activeLanguageButton === eachItem.id}
            onClickLanguageItem={this.onClickLanguageItem}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {apiStatus} = this.state
    return (
      <div className="app-container">
        <div className="responsive-container">
          <h1 className="heading">Popular</h1>
          {this.renderLanguageList()}
          {this.renderSwitch(apiStatus)}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
