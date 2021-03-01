import star from '../star.svg';

const Repo = (props) => {
  
  const langStyle = {
    backgroundColor: ''
  }

  const starStyle = {
    height: '14px',
    width: '14px',
    marginRight: '3px' 
  }

  props.language === 'HTML' ? langStyle.backgroundColor = 'lightcoral' :
  props.language === 'JavaScript' ? langStyle.backgroundColor = 'gold' :
  props.language === 'CSS' ? langStyle.backgroundColor = 'lightblue' :
  langStyle.backgroundColor = 'lightgrey';
  
  return (
    <div className="repo-card" onClick={() => props.onClick()}>
      <h3 className="repo-title">{props.title}</h3>
      {props.description ? <p className="repo-desc">{props.description}</p> : null}
      <div className="card-footer">  
        <span className="repo-language">
          <code style={langStyle}>{!props.language? 'No Languages Detected': props.language}</code>
        </span>
        <span className="stargazers">
          <img src={star} style={starStyle} alt="A Star Icon"/>
          {props.starCount}
        </span>
      </div>
    </div>
  )
}

export default Repo;