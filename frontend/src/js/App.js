import React, { Component } from 'react';
import '../static/App.css';

import SearchComponent from './Search';
import AuthMenu from './AuthMenu';
import BooklistComponent from './DisplayBooklist';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: "not logged in"
    }

    this.refresh = this.refresh.bind(this)
  }
  
  componentDidMount() {
    this.refresh()
  }

  refresh() {
    fetch('http://localhost:5000/whoami', {credentials: 'include'})
    .then(response => response.json())
    .then(data => this.setState( { username : data.username ? data.username : "not logged in" }))
    .catch((error) => { /* */});
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <AuthMenu authenticating={this.refresh}/>
        </header>
        <div>
          { this.state.username }
          <BooklistComponent/>
          <SearchComponent/>
        </div>
      </div>
    );
  }
}

export default App;
