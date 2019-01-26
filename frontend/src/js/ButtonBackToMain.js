import React, { Component } from 'react';
import '../static/App.css';
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

class BackButton extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          error: null,
          isLoading: false
        }
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
            <Link to="/">
                <Button bsStyle="primary">Back</Button>
            </Link>
        );
    }
}

export default BackButton;