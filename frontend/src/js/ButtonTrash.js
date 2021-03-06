import React, { Component } from 'react';
import '../static/App.css';
import { Button } from "react-bootstrap";
import { MY_URL } from './secrets';

class TrashButton extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          error: null,
          isLoading: false
        }
      }

    handleTrash = (e) => {
        fetch(MY_URL + '/book/' + this.props.book_id + '/delete', {
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .then(() => this.props.refreshBooklist())
        .catch((error) => {this.setState({isLoading: true, error})});
      }
  
    render() {
        const { error, isLoading } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        }
        
        if (isLoading) {
        return <p>Loading...</p>
        }

        return (
            <Button className="TrashBtn" bsSize="xsmall" onClick={this.handleTrash}>Remove</Button>
        );
    }
}

export default TrashButton;