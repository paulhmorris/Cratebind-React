import star from '../star.svg';

const Details = (props) => {
  const langStyle = {
    backgroundColor: ''
  }

  const starStyle = {
    height: '14px',
    width: '14px',
    marginRight: '3px',
  }

  const closeStyle = {
    alignSelf: 'flex-end',
    fontSize: '24px',
    cursor: 'pointer',
  }

  props.language === 'HTML' ? langStyle.backgroundColor = 'lightcoral' :
  props.language === 'JavaScript' ? langStyle.backgroundColor = 'gold' :
  props.language === 'CSS' ? langStyle.backgroundColor = 'lightblue' :
  langStyle.backgroundColor = 'lightgrey';

  return (
    <div className="details">
      <span onClick={() => props.onClick()} style={closeStyle}>X</span>
      <h2 className="repo-title">{props.title}</h2>
      <h4 className="repo-desc">{props.description}</h4>
      <a href={props.github} target="_blank">View on GitHub</a>
      <span className="repo-language">
        Languages: <code style={langStyle}>{!props.language ? 'No Languages Detected' : props.language}</code>
      </span>
      <p style={{ marginBottom: 0 }}>Forks: {props.forks}</p>
      <p>Open Issues: {props.issues}</p>
      {props.homepage ? <a href={props.homepage} target="_blank">Repo Homepage</a> : null}
      <span className="stargazers">
        <img src={star} style={starStyle} alt="A Star Icon" />
        {props.starCount}
      </span>
    </div>
  )
}

export default Details;