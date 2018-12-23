import React, { Component } from 'react';
import '../static/App.css';

import { Link } from "react-router-dom";

class SearchComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      isLoading: false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({input: event.target.value});
  }

  render() {
    const {error} = this.state;
    
    if (error) {
      return <div>Error: {error.message}</div>
    }

    return (
      <div className="Search">
        <form>
          <input 
            type="text" 
            className="input" 
            placeholder="Title..." 
            value={this.state.input} 
            onChange={this.handleChange} 
          />
          <Link to={{pathname: "/createBookList", state: { title: this.state.input }}}>
              <button type="button">Create list</button>
          </Link>
        </form>
      </div>
    );
  }
}

export default SearchComponent;