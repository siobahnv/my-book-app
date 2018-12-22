import React, { Component } from 'react';
import '../static/App.css';

class AuthMenu extends Component {
  constructor(props) {
    super(props);

    // this.state = {isSubmit: false};
    
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      username: "not logged in"
    }
  }

  handleLogin(e) {
    e.preventDefault();
    const data = new FormData(e.target);

    fetch('http://localhost:5000/login', {
      credentials: 'include',
      method: 'POST',
      body: data,
    })        
    .then(data => fetch('http://localhost:5000/whoami', {
      credentials: 'include',
    }))
    .then(data => this.setState( { username : data.username }));
  }

  render() {
    return (
      <div className="sign-in">
        <form method="POST" action="http://localhost:5000/login" id="userlogin" onSubmit={this.handleLogin}>
          <input type="text" name="username" placeholder="username"></input>
          <input type="text" name="password" placeholder="password"></input>
          <button>{this.state.username === "not logged in" ? "Log In" : "Log Out "}</button>
        </form>
      </div>
    );
  }
}

export default AuthMenu;