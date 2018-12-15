import React, { Component } from 'react';
import '../static/App.css';

class SearchComponent extends Component {
  render() {
    return (
      <div className="Search">
      <input type="text" className="input" id="addInput" placeholder="Title..."/>
        <button>Create List</button>
      </div>
    );
  }
}

export default SearchComponent;