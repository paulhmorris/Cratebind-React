import React, { Component } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import Repo from './components/Repo';
import Search from './components/Search';
import Details from './components/Details';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      repos: [],
      searchedUser: '',
      showRepos: true,
      showDetails: false,
      repoDetailId: 0,
      isLoading: false,
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
        } else {
          this.setState({ repos: data
            // filter out forked repos
            .filter(repo => repo.fork === false && repo.archived === false)
            // sort by most stars
            .sort((a, b) => (a.stargazers_count < b.stargazers_count) ? 1 : -1),
            noResults: false,
          })
        }
        this.setState({ isLoading: false })
        console.log(this.state.repos);
      })
      .catch((error) => {
        console.error('Error:', error);
        this.setState({ isLoading: false, noResults: true });
      })
  }

  handleInput = (e) => {
    this.setState({ searchedUser: e.target.value })
  }

  // Runs on Search button press
  handleSearch = (e) => {
    this.setState({
      repos: [],
      isLoading: true,
      showRepos: true,
      noResults: false,
      showDetails: false,
    })
    e.preventDefault();
    this.fetchData();
  }

  showDetails = (repoId) => {
    this.setState({ showRepos: false, repoDetailId: repoId, showDetails: true})
  }

  handleClose = () => {
    this.setState({ showRepos: true, showDetails: false })
  }

  render() {
    let repos = null;
    if (this.state.showRepos) {
      repos = this.state.repos.map((repo) => {
        return (
          <Repo
            key={repo.id}
            title={repo.name}
            description={repo.description}
            language={repo.language}
            starCount={repo.stargazers_count}
            onClick={() => this.showDetails(repo.id)}
          />
        )
      })
    };

    // Get details for the repo the user clicked
    let repoDetail = this.state.repos.filter((repo) => repo.id === this.state.repoDetailId);

    return (
      <div className="app">
        <header className="header">
          <h1>GitHub Browser</h1>
        </header>
          <Search
            onClick={this.handleSearch}
            onChange={this.handleInput}
          />
        <div className="loader">
          {this.state.isLoading ? <Loader type="Grid" color="royalblue" height={120} width={120} /> : null}
        </div>
            {this.state.noResults ? <h1 className="no-results">No repositories found...</h1> : null}
            {this.state.showDetails ? 
              <Details
                onClick={this.handleClose}
                github={repoDetail[0].html_url}
                author={repoDetail[0].owner.login}
                branch={repoDetail[0].default_branch}
                title={repoDetail[0].name}
                description={repoDetail[0].description}
                language={repoDetail[0].language}
                starCount={repoDetail[0].stargazers_count}
                homepage={repoDetail[0].homepage}
                forks={repoDetail[0].forks}
                issues={repoDetail[0].open_issues}
              /> 
              : null 
            }
        <main className="repo-results">
          {repos}
        </main>
      </div>
    );
  }
}

export default App;