import React, { Component } from 'react';
import { connect } from "react-redux";
// import { bindActionCreators } from 'redux';
import '../static/App.css';

import { loginUser, logoutUser } from './actions'
// import { fetchBooklist } from './actions';

import { Link } from "react-router-dom";
import { Button, ButtonGroup, ButtonToolbar, DropdownButton } from "react-bootstrap";
import { FormGroup, FormControl } from "react-bootstrap";
import { Col } from "react-bootstrap";

class AuthMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      // email: '',
      password: '',
      // loggedIn: false
    }

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

    console.log("hitting here?");

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
    // console.log(this.props.username + " " + this.props.password);
    console.log(this.state.username, this.state.password);
  }

  render() {
    // const { dispatch, isAuthenticated, errorMessage } = this.props
    
    // if (this.state.loggedIn) {
    if (this.props.loggedIn) {
      return (
        <div className="Nav">
          <div className="profile">
            <Col xs={12}>
              {/* <Image src={'https://via.placeholder.com/30'} alt="ProfilePic" className="img-profile" responsive/> */}
              {this.state.username}
              <Button className="logoutbutton" onClick={this.handleLogout}>logout</Button>
            </Col>
          </div>
        </div>
      );
    }

    return (
      <ButtonToolbar>
        <DropdownButton className="pull-right" bsStyle="default" title="Login" noCaret id="dropdown-no-caret">
          <div className="Nav">
            <form onSubmit={this.handleLogin}>
              <Col xs={12}>
                <FormGroup>
                  <FormControl type="text" placeholder="Username" name="username" value={this.state.username} onChange={this.handleChange} />
                  <FormControl type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} />
                  <ButtonGroup>
                    <Button bsStyle="primary" type="submit">Submit</Button>
                    <Link to={{ pathname: '/register', state: { username: this.state.username, password: this.state.password } }}><Button>Register</Button></Link>
                  </ButtonGroup>
                </FormGroup>
              </Col>
            </form>
          </div>
        </DropdownButton>
      </ButtonToolbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      loggedIn: state.loggedIn,
      // username: state.username,
      // password: state.password
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