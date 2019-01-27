import React, { Component } from 'react';
import '../static/App.css';
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FormGroup, FormControl } from "react-bootstrap";

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
          <FormGroup>
            <FormControl 
              type="text" 
              className="input" 
              placeholder="Search for books related to (enter a title)..." 
              value={this.state.input} 
              onChange={this.handleChange}
            />
          </FormGroup>
          <Link to={{pathname: "/createBookList", state: { title: this.state.input }}}>
              <Button>Create list</Button>
          </Link>
        </form>
      </div>
    );
  }
}

export default SearchComponent;