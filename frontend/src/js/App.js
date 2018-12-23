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

  }

  handleLogIn(name, isLoggedIn) {
    this.setState( { 
      username : name,
      loggedIn : isLoggedIn
    });
  }

  render() {

    return (
      <div className="App">
        <div className="Nav">
          <AuthMenu authenticating={this.handleLogIn} />
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
