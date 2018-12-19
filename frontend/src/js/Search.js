import React, { Component } from 'react';
import '../static/App.css';

class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    alert('The value is: ' + this.input.value);
    e.preventDefault();
  }

  render() {
    return (
      <div className="Search">
        <form onSubmit={this.handleSubmit}>
          <input type="text" className="input" id="addInput" placeholder="Title..."/>
          <input type="submit" value="Create List" />
        </form>
      </div>
    );
  }
}

export default SearchComponent;