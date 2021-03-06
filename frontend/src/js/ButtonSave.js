import React, { Component } from 'react';
import { connect } from "react-redux";
// import { addBook } from './actions';
import '../static/App.css';
import { Button } from "react-bootstrap";
import { MY_URL } from './secrets';

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

        fetch(MY_URL + '/book/save', {
            credentials: 'include',
            method: 'POST',
            body: title,
        })
        // .then(data => this.props.addBook(data))
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
            <Button bsSize="xsmall" onClick={this.handleSave}>Add</Button>
        );
    }
}

// const mapStateToProps = (state, ownProps) => {
//     // let status = ownProps.status;
//     return {
//         // books: state.books
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     // saveBook: (id) => { dispatch({type: 'ADD_BOOK', id: id}) }
// }

// const mapStateToProps = (state) => {
//     return {
//         booklist: state.booklist
//     }
// }

// const mapDispatchToProps = (dispatch) => ({
//     addBook: (book) => dispatch(addBook(book))
// })

export default connect()(SaveButton)