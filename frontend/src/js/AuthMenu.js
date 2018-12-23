import React, { Component } from 'react';
import '../static/App.css';

class AuthMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      loggedIn: false
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.refresh = this.refresh.bind(this);
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
    .then(() => this.props.authenticating(this.state.username, this.state.loggedIn))
    .catch((error) => { /* */});
  }

  handleLogin(e) {
    e.preventDefault();
    const data = new FormData(e.target);

    fetch('http://localhost:5000/login', {
      credentials: 'include',
      method: 'POST',
      body: data,
    })    
    .then(() => this.refresh());   
  }

  handleLogout(e) {
    e.preventDefault();

    fetch('http://localhost:5000/logout', {
      credentials: 'include'
    })    
    .then(() => this.refresh());   
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <div className="Nav">
          <div className="profile">
            <img src={'https://via.placeholder.com/30'} alt="ProfilePic" className="img-profile"/>
            {this.state.username}
            <button className="logoutbutton" onClick={this.handleLogout}>logout</button>
          </div>
        </div>
      );
    }

    return (
      <div className="Nav">
        <form method="POST" action="http://localhost:5000/login" id="userlogin" onSubmit={this.handleLogin}>
          <input type="text" name="username" placeholder="username"></input>
          <input type="text" name="password" placeholder="password"></input>
          <button>Login</button>
        </form>
      </div>
    );
  }
}

export default AuthMenu;