import React, { Component } from 'react';
import '../static/App.css';

class AuthMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "not logged in",
      loggedin: false,
      isLoading: false
    };
    
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  // componentDidMount() {
  //   this.setState({ isLoading: true });

  //   fetch('http://localhost:5000/login', {
  //     credentials: 'include',
  //   });
  // }

  handleLogin(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    this.setState({loggedin:true});

    fetch('http://localhost:5000/login', {
      credentials: 'include',
      method: 'POST',
      body: data,
    })    
    .then(() => this.props.authenticating());   
    // .then(data => fetch('http://localhost:5000/whoami', {
    //   credentials: 'include',
    // }))
    // .then(data => this.setState( { username : data.username }));
  }

  handleLogout(e) {
    e.preventDefault();
    this.setState({loggedin:false});

    // do something?
  }

  render() {
    const {loggedin} = this.state;

    if (loggedin) {
      return (
        <div>
          <button onClick={this.handleLogout}>logout</button>
        </div>
      );
    }

    return (
      <div className="sign-in">
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