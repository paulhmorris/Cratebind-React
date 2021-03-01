import React, { Component } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import Repo from './components/Repo';
import Search from './components/Search';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      repos: [],
      searchedUser: '',
      isLoading: false,
      hasError: false,
      noResults: false
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData = () => {
    fetch(`https://api.github.com/users/${this.state.searchedUser}/repos`)
      .then(res => res.json())
      .then((data) => {
        if (data.length === 0) {
          this.setState({ noResults: true})
        } else this.setState({ noResults: false })
        // filter out forked repos
        this.setState({ repos: data
          .filter(repo => repo.fork === false)
          // sort by most stars
          .sort((a, b) => (a.stargazers_count < b.stargazers_count) ? 1 : -1)
        })
        this.setState({ isLoading: false, hasError: false })
        console.log(this.state.repos);
      })
      .catch((error) => {
        console.error('Error:', error);
        this.setState({ isLoading: false, hasError: true });
      })
  }

  handleInput = (e) => {
    this.setState({ searchedUser: e.target.value })
  }

  handleSearch = (e) => {
    this.setState({ repos: [], isLoading: true, hasError: false })
    e.preventDefault();
    this.fetchData();
  }


  render() {
    const repos = this.state.repos.map((repo, index) => {
        return (
          <Repo
            key={index}
            title={repo.name}
            description={repo.description}
            language={repo.language}
            starCount={repo.stargazers_count}
          />
        )
    })

    return (
      <div className="app">
        <header className="header">
          <h1>Github Browser</h1>
        </header>
          <Search
            onClick={this.handleSearch}
            onChange={this.handleInput}
          />
        <div className="loader">
          {this.state.isLoading ? <Loader type="Grid" color="#00BFFF" height={120} width={120} /> : null}
        </div>
            { this.state.noResults ? <h1 className="no-results">No repositories found...</h1> : null }
        <main className="repo-results">
          {repos}
        </main>
      </div>
    );
  }
}

export default App;