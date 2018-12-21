import React, { Component } from 'react';
import '../static/App.css';

class AuthMenu extends Component {
  render() {
    return (
      <div className="sign-in">
        <form method="POST">
          <input type="text" name="username" placeholder="username"></input>
          <button onClick={this.login}>Sign In</button>
        </form>
      </div>
    );
  }
}

export default AuthMenu;