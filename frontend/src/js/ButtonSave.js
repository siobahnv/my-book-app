import React, { Component } from 'react';
import { connect } from "react-redux";

import '../static/App.css';
import { ADD_BOOK } from './constants/action-types';

class SaveButton extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          status: false,
        //   error: null,
        //   isLoading: false
        }
      }

    handleSave = (e) => {
        this.setState({status: true});
        const title = this.props.title;

        fetch('http://localhost:5000/book/save', {
            credentials: 'include',
            method: 'POST',
            body: title,
        })
        // .then(response => response.json())
        // .catch((error) => {this.setState({isLoading: true, error})});
      }
  
    render() {
        // const { status, error, isLoading } = this.state;
        const { status } = this.state;

        // if (error) {
        //     return <div>Error: {error.message}</div>;
        // }
        
        // if (isLoading) {
        // return <p>Loading...</p>
        // }

        if (status) {
            return (
                <i className="fa fa-check" aria-hidden="true"></i>
            );
        }

        return (
            <button type="button" onClick={this.handleSave}>Save</button>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        // books: state.books
    }
}

const mapDispatchToProps = (dispatch) => {
    saveBook: (id) => { dispatch({type: 'ADD_BOOK', id: id}) }
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveButton)