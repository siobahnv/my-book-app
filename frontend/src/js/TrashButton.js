import React, { Component } from 'react';
import '../static/App.css';

class TrashButton extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
        //   book_id: '',
          error: null,
          isLoading: false
        }
      }
    
    //   componentDidMount() {
    //     this.setState({ isLoading: true});
    
    //     fetch('http://localhost:5000/booklist')
    //     .then(response => response.json())
    //     .then(data => this.setState({ books: data, isLoading: false }))
    //     .catch((error) => {this.setState({isLoading: true, error})});
    //   }

    handleTrash = (e) => {
        // do something
        console.log(this.props.book_id);
        // this.setState({book_id: this.props.book_id});
        alert("Trash!");

        fetch('http://localhost:5000/book/' + this.props.book_id + '/delete', {
            credentials: 'include',
        })
        .then(response => response.json())
        // .then(data => this.setState({ books: data, isLoading: false }))
        .then(data => console.log(data))
        .then(() => this.props.callback())
        .catch((error) => {this.setState({isLoading: true, error})});
      }
  
    render() {
        // const { book_id, error, isLoading } = this.state;
        const { error, isLoading } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        }
        
        if (isLoading) {
        return <p>Loading...</p>
        }

        return (
            <button type="button" onClick={this.handleTrash}>Trash</button>
        );
    }
}

export default TrashButton;