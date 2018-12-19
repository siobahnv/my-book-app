import React, { Component } from 'react';
import '../static/App.css';

import SearchComponent from './Search';
import AuthMenu from './AuthMenu';
import BooklistComponent from './DisplayBooklist';

class App extends Component {

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <AuthMenu/>
        </header>
        <div>
          <BooklistComponent/>
          <SearchComponent/>
        </div>
      </div>
    );
  }
}

export default App;
