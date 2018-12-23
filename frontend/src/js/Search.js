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

    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // handleSubmit(e) {
  //   e.preventDefault();
  //   // const value = e.target.value;
  //   // alert(value);
  //   const data = new FormData(e.target);
  //   // console.log(data)

  //   fetch('http://localhost:5000/createBookList', {
  //     credentials: 'include',
  //     method: 'POST',
  //     body: data,
  //   })
  //   .catch((error) => {this.setState({isLoading: true, error})});
  // }

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
          <input id="new_book_title" type="text" className="input" placeholder="Title..." value={this.state.input} onChange={this.handleChange} />
          {/* <input type="submit" value="Create List" /> */}
          {/* document.getElementById("new_book_title").innerText */}
          <Link to={{pathname: "/createBookList", state: { title: this.state.input }}}>
              <button type="button">Create list</button>
          </Link>
        </form>
      </div>
    );
  }
}

export default SearchComponent;