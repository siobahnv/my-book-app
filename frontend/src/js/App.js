import React, { Component } from 'react';
import { connect } from "react-redux";
import '../static/App.css';

import SearchComponent from './Search';
import AuthMenu from './AuthMenu';
import BooklistComponent from './DisplayBooklist';

class App extends Component {

  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     username: "not logged in",
  //     loggedIn: false
  //   }

  // }

  handleLogIn(name, isLoggedIn) {
    this.setState( { 
      username : name,
      loggedIn : isLoggedIn
    });
  }

  render() {

    const { dispatch, isAuthenticated, errorMessage } = this.props

    return (
      <div className="App">
        <div className="Nav">
          {/* <AuthMenu authenticating={this.handleLogIn} /> */}
          <AuthMenu
            isAuthenticated={isAuthenticated}
            errorMessage={errorMessage}
            dispatch={dispatch}
          />
        </div>
        <div className="App-body">
          <BooklistComponent/>
          <SearchComponent/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {

  const { isAuthenticated, errorMessage } = state

  return {
    isAuthenticated,
    errorMessage
  }
}

export default connect(mapStateToProps)(App);
