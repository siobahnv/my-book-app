import React, { Component } from 'react';
import '../static/App.css';

import SearchComponent from './Search';
import AuthMenu from './AuthMenu';
import BooklistComponent from './DisplayBooklist';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: "not logged in",
      loggedIn: false
    }

    this.refresh = this.refresh.bind(this)
  }
  
  componentDidMount() {
    this.refresh()
  }

  refresh() {
    fetch('http://localhost:5000/whoami', {credentials: 'include'})
    .then(response => response.json())
    .then(data => this.setState( { 
      username : data.username !== "nobody" ? data.username : "not logged in",
      loggedIn : data.username !== "nobody" ? true : false
    }))
    .catch((error) => { /* */});
  }

  render() {

    return (
      <div className="App">
        <div className="Nav">
          <AuthMenu authenticating={this.refresh} username={this.state.username} loggedIn={this.state.loggedIn}/>
        </div>
        <div>
          <BooklistComponent/>
          <SearchComponent/>
        </div>
      </div>
    );
  }
}

export default App;
