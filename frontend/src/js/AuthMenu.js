import React, { Component } from 'react';
import '../static/App.css';

import { Link } from "react-router-dom";

class AuthMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      loggedIn: false
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.refresh = this.refresh.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.refresh()
  }

  refresh() {
    fetch('http://localhost:5000/whoami', {credentials: 'include'})
    .then(response => response.json())
    .then(data => this.setState( { 
      username : data.username !== "nobody" ? data.username : "",
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

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state.username + " " + this.state.password);
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
        <form id="userlogin" onSubmit={this.handleLogin}>
          <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.handleChange}></input>
          <input type="text" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange}></input>
          <button>Login</button>
          {/* <Link to="/register"><button type="button">Register</button></Link> */}
          <Link to={{ pathname: '/register', state: { username: this.state.username, password: this.state.password } }}><button type="button">Register</button></Link>
        </form>
      </div>
    );
  }
}

export default AuthMenu;