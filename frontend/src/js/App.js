import React, { Component } from 'react';
import '../static/App.css';

import SearchComponent from './Search';
import AuthMenu from './AuthMenu';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      isLoading: false
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true});

    fetch('http://localhost:5000/booklist')
    .then(response => response.json())
    .then(data => this.setState({ books: data, isLoading: false }));
  }

  render() {
    const { books, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>
    }

    console.log(books);

    return (
      <div className="App">
        <header className="App-header">
          <AuthMenu/>
        </header>
        <div>
          { books.book1 }
          <SearchComponent/>
        </div>
      </div>
    );
  }
}

export default App;
