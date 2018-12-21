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
    alert("WOoo");

    // fetch('http://localhost:5000/login', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     username: e.target.value,
    //   })
    // })

    fetch('http://localhost:5000/login', {
      credentials: 'include',
      method: 'POST',
      body: data,
    })        
    .then(data => fetch('http://localhost:5000/whoami', {
      credentials: 'include',
    }))
    .then(data => this.setState( { username : data.username }));

    // this.setState(state => ({
    //   isSubmit: !state.isSubmit
    // }));
  }

  render() {
    return (
      <div className="sign-in">
        <form method="POST" action="http://localhost:5000/login" id="userlogin" onSubmit={this.handleLogin}>
          <input type="text" name="username" placeholder="username"></input>
          {/* <button onClick={this.handleLogin}>
            {this.state.isSubmit ? 'Sign In' : 'Logout'}
          </button> */}
          <button>{this.state.username === "not logged in" ? "Log In" : "Log Out " + this.state.username}</button>
        </form>
      </div>
    );
  }
}

export default AuthMenu;