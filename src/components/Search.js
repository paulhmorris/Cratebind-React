const Search = (props) => {
  return (
    <div className="search-bar">
      <input
        id="search"
        className="search"
        type="text"
        name="search"
        onChange={(event) => props.onChange(event)}
        placeholder="Search a Github User..."
      />
      <button
        className="search-button"
        type="submit"
        onClick={(event) => props.onClick(event)}
      >Search
      </button>
  </div>
  )
}

export default Search;