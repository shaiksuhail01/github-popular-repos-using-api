import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, isActive, onClickLanguageItem} = props
  const {id, language} = languageDetails
  const activeButtonClass = isActive ? 'activeButton' : ''

  const onClickButton = () => {
    onClickLanguageItem(id)
  }

  return (
    <li className="listItemContainer">
      <button
        type="button"
        className={`buttonEl ${activeButtonClass}`}
        onClick={onClickButton}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
