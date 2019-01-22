import React, { Component } from 'react';
import { connect } from "react-redux";
import '../static/App.css';
import { fetchBooklist } from './actions';

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

  // handleLogIn(name, isLoggedIn) {
  //   this.setState( { 
  //     username : name,
  //     loggedIn : isLoggedIn
  //   });
  // }

  fetchBooklist() {
    fetch('http://localhost:5000/booklist', {
      credentials: 'include',
    })
    .then(response => response.json())
    .then(data => this.props.fetchBooklist(data))
  }

  render() {

    const { dispatch, isAuthenticated, errorMessage } = this.props

    return (
      <div className="App">
        <div className="Nav">
          {/* <AuthMenu authenticating={this.handleLogIn} /> */}
          <AuthMenu
            // isAuthenticated={isAuthenticated}
            // errorMessage={errorMessage}
            // dispatch={dispatch}
            loggedInCallback={() => this.fetchBooklist()}
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

const mapStateToProps = (state) => {
  return {
      booklist: state.booklist,
      loggedIn: state.loggedIn
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchBooklist: (books) => dispatch(fetchBooklist(books))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
