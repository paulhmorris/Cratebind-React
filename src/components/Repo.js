
const Repo = (props) => {
  
  const langStyle = {
    backgroundColor: ''
  }

  props.language === 'HTML' ? langStyle.backgroundColor = 'lightcoral' :
  props.language === 'JavaScript' ? langStyle.backgroundColor = 'gold' :
  props.language === 'CSS' ? langStyle.backgroundColor = 'lightblue' :
  langStyle.backgroundColor = 'ghostwhite';
  
  return (
    <div className="repo-card">
      <h3 className="repo-title">{props.title}</h3>
      {props.description ? <p className="repo-desc">{props.description}</p> : null}
      <div>  
        <span className="repo-language">
          <code style={langStyle}>{!props.language? 'No Languages Detected': props.language}</code>
        </span>
        <span className="stargazers">{props.starCount}</span>
      </div>
    </div>
  )
}

export default Repo;