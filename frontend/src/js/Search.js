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

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    // const value = e.target.value;
    // alert(value);
    const data = new FormData(e.target);
    // console.log(data)

    fetch('http://localhost:5000/createBookList', {
      credentials: 'include',
      method: 'POST',
      body: data,
    })
    .catch((error) => {this.setState({isLoading: true, error})});
  }

  render() {
    const {error} = this.state;
    
    if (error) {
      return <div>Error: {error.message}</div>
    }

    return (
      <div className="Search">
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="booktitle" className="input" placeholder="Title..."/>
          {/* <input type="submit" value="Create List" /> */}
          <Link to="/createBookList">
              <button type="button">
                    Create list
              </button>
          </Link>
        </form>
      </div>
    );
  }
}

export default SearchComponent;