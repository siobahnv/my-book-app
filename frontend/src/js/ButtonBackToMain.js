import React, { Component } from 'react';
import '../static/App.css';

import { Link } from "react-router-dom";

class BackButton extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          error: null,
          isLoading: false
        }
      }

    // handleBack = (e) => {
    //     fetch('http://localhost:5000/', {
    //         credentials: 'include'
    //     })
    //     .then(response => response.json())
    //     // .then(data => console.log(data))
    //     // .then(() => this.props.refreshBooklist())
    //     .catch((error) => {this.setState({isLoading: true, error})});
    //   }
  
    render() {
        const { error, isLoading } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        }
        
        if (isLoading) {
        return <p>Loading...</p>
        }

        return (
            // <button type="button" onClick={this.handleBack}>Back</button>
            // <button><Link to={`/`}>Back</Link></button>
            <Link to="/">
                <button type="button">
                    Back
                </button>
            </Link>
        );
    }
}

export default BackButton;