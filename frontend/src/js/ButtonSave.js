import React, { Component } from 'react';
import '../static/App.css';

class SaveButton extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          error: null,
          isLoading: false
        }
      }

    handleSave = (e) => {
        console.log(this)
        console.log(this.props.title)
        const title = this.props.title

        fetch('http://localhost:5000/book/save', {
            credentials: 'include',
            method: 'POST',
            body: title,
        })
        .then(response => response.json())
        // .then(data => console.log(data))
        // .then(() => this.props.refreshBooklist())
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
            <button type="button" onClick={this.handleSave}>Save</button>
        );
    }
}

export default SaveButton;