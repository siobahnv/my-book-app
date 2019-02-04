import React, { Component } from 'react';
import { connect } from "react-redux";
import '../static/App.css';
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FormGroup, FormControl } from "react-bootstrap";
import { fetchBooks } from './actions';
import { MY_URL } from './secrets';

class SearchComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      isLoading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({input: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    fetch(MY_URL + '/createBookList/' + this.props.title, {
        credentials: 'include',
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => this.props.fetchBooks(data))
  }

  render() {
    const {error} = this.state;
    
    if (error) {
      return <div>Error: {error.message}</div>
    }

    return (
      <div className="Search">
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <FormControl 
              type="text" 
              className="input" 
              placeholder="Search for books related to (enter a title)..." 
              value={this.state.input} 
              onChange={this.handleChange}
            />
            <Link to={{pathname: "/createBookList", state: { title: this.state.input }}}>
                <Button type="submit">Search</Button>
            </Link>
          </FormGroup>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      bookresults: state.bookresults
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchBooks: (books) => dispatch(fetchBooks(books))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent)