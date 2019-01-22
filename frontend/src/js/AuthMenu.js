import React, { Component } from 'react';
import { connect } from "react-redux";
// import { bindActionCreators } from 'redux';
import '../static/App.css';

import { loginUser, logoutUser } from './actions'
// import { fetchBooklist } from './actions';

import { Link } from "react-router-dom";

class AuthMenu extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   username: '',
    //   password: '',
    //   // loggedIn: false
    // }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    // this.refresh = this.refresh.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }

  // componentDidMount() {
  //   this.refresh()
  // }

  // refresh() {
  //   fetch('http://localhost:5000/whoami', {credentials: 'include'})
  //   .then(response => response.json())
  //   // .then(data => this.setState( { 
  //   //   username : data.username !== "nobody" ? data.username : "",
  //   //   loggedIn : data.username !== "nobody" ? true : false
  //   // }))
  //   // .then(() => this.props.authenticating(this.state.username, this.state.loggedIn))
  //   // .catch((error) => { /* */});
  // }

  handleLogin(e) {
    e.preventDefault();
    const data = new FormData(e.target);

    fetch('http://localhost:5000/login', {
      credentials: 'include',
      method: 'POST',
      body: data,
    }) 
    .then(data => this.props.loginUser(data))
    .then(() => this.props.loggedInCallback())
    // .then(() => this.props.fetchBooklist())    
    // .then(() => this.refresh());   
  }

  handleLogout(e) {
    e.preventDefault();

    fetch('http://localhost:5000/logout', {
      credentials: 'include'
    }) 
    .then(() => this.props.logoutUser()) 
    // .then(() => this.props.fetchBooklist())   
    // .then(() => this.refresh());   
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.props.username + " " + this.props.password);
  }

  render() {
    // const { dispatch, isAuthenticated, errorMessage } = this.props
    
    // if (this.state.loggedIn) {
    if (this.props.loggedIn) {
      return (
        <div className="Nav">
          <div className="profile">
            <img src={'https://via.placeholder.com/30'} alt="ProfilePic" className="img-profile"/>
            {this.props.username}
            <button className="logoutbutton" onClick={this.handleLogout}>logout</button>
          </div>
        </div>
      );
    }

    return (
      <div className="Nav">
        <form id="userlogin" onSubmit={this.handleLogin}>
          <input type="text" name="username" placeholder="username" value={this.props.username} onChange={this.handleChange}></input>
          <input type="text" name="password" placeholder="password" value={this.props.password} onChange={this.handleChange}></input>
          <button>Login</button>
          {/* <Link to="/register"><button type="button">Register</button></Link> */}
          <Link to={{ pathname: '/register', state: { username: this.props.username, password: this.props.password } }}><button type="button">Register</button></Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      loggedIn: state.loggedIn,
      username: state.username,
      password: state.password
      // booklist: state.booklist
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: {
//       loginUser: bindActionCreators(loginUser, dispatch),
//       logoutUser: bindActionCreators(logoutUser, dispatch)
//     }
//   };
// }

const mapDispatchToProps = (dispatch) => ({
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()), 
  // fetchBooklist: () => dispatch(fetchBooklist()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthMenu)